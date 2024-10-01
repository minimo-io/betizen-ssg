const inspect = require("util").inspect;
const path = require("node:path");
const fs = require("node:fs");

const { DateTime } = require("luxon");
const markdownItAnchor = require("markdown-it-anchor");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const { EleventyI18nPlugin } = require("@11ty/eleventy");

const pluginDrafts = require("./eleventy.config.drafts.js");
const pluginImages = require("./eleventy.config.images.js");

module.exports = function (eleventyConfig) {
    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        "./public/": "/assets/",
    });

    eleventyConfig.addPassthroughCopy({ "public/robots.txt": "robots.txt" });
    // Run Eleventy when these files change:
    // https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets

    // Watch content images for the image pipeline.
    eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpeg}");

    // App plugins
    eleventyConfig.addPlugin(pluginDrafts);
    eleventyConfig.addPlugin(pluginImages);

    // Official plugins
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(pluginBundle);
    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        defaultLanguage: "es", // Required
        errorMode: "never",
    });

    // Filters
    eleventyConfig.addFilter(
        "debug",
        (content) => `<pre>${inspect(content)}</pre>`,
    );
    // Filter all games for provider
    eleventyConfig.addFilter(
        "forProvider",
        function (collection, providerUrl, pageLang) {
            if (!providerUrl) return collection;
            const filtered = collection.filter((item) => {
                if (!item.data.provider) return false;
                if (pageLang != item.data.lang) return false;
                return item.data.provider.url == providerUrl;
            });
            return filtered;
        },
    );
    // Filter all games for category
    eleventyConfig.addFilter(
        "forCategory",
        function (collection, category, pageLang) {
            if (!category) return collection;
            const filtered = collection.filter((item) => {
                if (pageLang != item.data.lang) return false;
                return item.data.tags.includes(category);
            });
            return filtered;
        },
    );
    // Filter games by provider
    eleventyConfig.addFilter(
        "gamesForProvider",
        function (collection, providerUrl) {
            const filtered = collection.filter((item) => {
                if (item.data.provider.url) {
                    if (providerUrl == item.data.provider.url) return true;
                }
                return false;
            });
            return filtered;
        },
    );

    // Filter by language
    eleventyConfig.addFilter("forLang", function (collection, pageLang) {
        const filtered = collection.filter((item) => {
            if (pageLang != item.data.lang) return false;
            return true;
        });
        return filtered;
    });

    // Filter by featured post
    eleventyConfig.addFilter("featured", function (collection) {
        const filtered = collection.filter((item) => {
            if (item.data.featured) return true;
            return false;
        });
        return filtered;
    });

    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
        // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
        return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(
            format || "dd LLLL yyyy",
        );
    });

    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
        return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
            "yyyy-LL-dd",
        );
    });

    // Get the first `n` elements of a collection.
    eleventyConfig.addFilter("head", (array, n) => {
        if (!Array.isArray(array) || array.length === 0) {
            return [];
        }
        if (n < 0) {
            return array.slice(n);
        }

        return array.slice(0, n);
    });

    // get formatted post date
    eleventyConfig.addFilter("postDate", (dateString) => {
        dateObj = new Date(dateString);
        let monthName = dateObj.toLocaleString("en", { month: "long" });
        let dayNumber = dateObj.getDate();
        let yearNumber = dateObj.getFullYear();
        return `${monthName} ${dayNumber}, ${yearNumber}`;
    });

    // Return the smallest number argument
    eleventyConfig.addFilter("min", (...numbers) => {
        return Math.min.apply(null, numbers);
    });

    // Return all the tags used in a collection
    eleventyConfig.addFilter("getAllTags", (collection) => {
        let tagSet = new Set();
        for (let item of collection) {
            (item.data.tags || []).forEach((tag) => tagSet.add(tag));
        }
        return Array.from(tagSet);
    });

    // sort casinos by score
    // credit: @noelforte - https://github.com/11ty/eleventy/issues/898
    eleventyConfig.addFilter("sortByOrder", function (values) {
        {
            let vals = [...values]; // this *seems* to prevent collection mutation...
            return vals.sort((a, b) => Math.sign(b.data.score - a.data.score));
        }
    });

    eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
        return (tags || []).filter(
            (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1,
        );
    });

    // Customize Markdown library settings:
    eleventyConfig.amendLibrary("md", (mdLib) => {
        mdLib.use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.ariaHidden({
                placement: "after",
                class: "header-anchor",
                symbol: "#",
                ariaHidden: false,
            }),
            level: [1, 2, 3, 4],
            slugify: eleventyConfig.getFilter("slugify"),
        });
    });

    eleventyConfig.addShortcode("currentBuildDate", () => {
        return new Date().toISOString();
    });

    eleventyConfig.addShortcode(
        "providerImageExists",
        function (imageName, providersImageUrl) {
            const imageFile = path.join(
                "public/imgs/providers",
                `${imageName}`,
            );

            let imageResult = `${providersImageUrl}/${imageName}`;
            if (!fs.existsSync(imageFile)) {
                imageResult = "/assets/imgs/site/placeholder.webp";
            }
            return imageResult;
        },
    );

    // Features to make your build faster (when you need them)

    // If your passthrough copy gets heavy and cumbersome, add this line
    // to emulate the file copy on the dev server. Learn more:
    // https://www.11ty.dev/docs/copy/#emulate-passthrough-copy-during-serve

    // eleventyConfig.setServerPassthroughCopyBehavior("passthrough");

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: ["md", "njk", "html", "liquid"],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",

        // These are all optional:
        dir: {
            input: "content", // default: "."
            includes: "../_includes", // default: "_includes"
            data: "../_data", // default: "_data"
            output: "_site",
        },

        // -----------------------------------------------------------------
        // Optional items:
        // -----------------------------------------------------------------

        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

        // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
        // it will transform any absolute URLs in your HTML to include this
        // folder name and does **not** affect where things go in the output folder.
        pathPrefix: "/",
    };
};

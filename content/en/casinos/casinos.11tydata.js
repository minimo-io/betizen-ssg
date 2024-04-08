module.exports = {
    lang: "en",
    tags: ["casinos"],
    layout: "layouts/base.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `${data.lang}/online-casino/${this.slugify(
                data.slugOverride
            )}/`;
        }
    },
};

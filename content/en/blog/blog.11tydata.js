module.exports = {
    lang: "en",
    tags: ["posts"],
    layout: "layouts/post.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/${data.lang}/articles/${this.slugify(data.slugOverride)}/`;
        }
    },
};

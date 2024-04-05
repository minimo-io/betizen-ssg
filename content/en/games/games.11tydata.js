module.exports = {
    tags: ["games"],
    lang: "en",
    layout: "layouts/base.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/${data.lang}/game/${this.slugify(data.slugOverride)}/`;
        }
    },
};

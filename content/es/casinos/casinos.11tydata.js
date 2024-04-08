module.exports = {
    lang: "es",
    tags: ["casinos"],
    layout: "layouts/base.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/casino/${this.slugify(data.slugOverride)}/`;
        }
    },
};

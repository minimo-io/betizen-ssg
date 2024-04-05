module.exports = {
    lang: "es",
    layout: "layouts/base.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/${this.slugify(data.slugOverride)}/`;
        }
    },
};

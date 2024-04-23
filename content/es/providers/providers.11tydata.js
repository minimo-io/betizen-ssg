module.exports = {
    lang: "es",
    tags: ["provider"],
    layout: "layouts/single-provider.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/proveedor/${this.slugify(data.slugOverride)}/`;
        }
    },
};

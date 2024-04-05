module.exports = {
    lang: "es",
    tags: ["games"],
    layout: "layouts/base.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/juego/${this.slugify(data.slugOverride)}/`;
        }
    },
};

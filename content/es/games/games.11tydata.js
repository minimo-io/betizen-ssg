module.exports = {
    lang: "es",
    tags: ["games"],
    layout: "layouts/game.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/juego/${this.slugify(data.slugOverride)}/`;
        }
    },
};

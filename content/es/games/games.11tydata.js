const metadata = require("../../../_data/metadata.js");

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
    eleventyComputed: {
        pageTitle: (data) => {
            if (data.tags.includes("bingo")) {
                return data.title + " - Juega gratis con bolas extras";
            } else if (data.tags.includes("slot")) {
                return (
                    "Tragamonedas " + data.title + " - Giros gratis y RTP 🏅"
                );
            }
            return data.title + " - Jugar gratis - " + metadata.title;
        },
    },
};

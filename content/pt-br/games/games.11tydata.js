const metadata = require("../../../_data/metadata.js");
module.exports = {
    lang: "pt-br",
    tags: ["games"],
    layout: "layouts/game.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/${data.lang}/jogo/${this.slugify(data.slugOverride)}/`;
        }
    },
    eleventyComputed: {
        pageTitle: (data) => {
            if (data.tags.includes("bingo")) {
                return data.title + " - Jogue gratis com bolas extras";
            } else if (data.tags.includes("slot")) {
                return data.title + " - Análise do slot e jogar grátis 🏅";
            }
            return "Jogar grátis " + data.title + " - " + metadata.title;
        },
    },
};

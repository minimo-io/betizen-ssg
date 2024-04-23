const metadata = require("../../../_data/metadata.js");
module.exports = {
    tags: ["games"],
    lang: "en",
    layout: "layouts/game.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/${data.lang}/game/${this.slugify(data.slugOverride)}/`;
        }
    },
    eleventyComputed: {
        pageTitle: (data) => {
            if (data.tags.includes("bingo")) {
                return data.title + " review - RTP & Free spins";
            } else if (data.tags.includes("slot")) {
                return data.title + " slot review - 🏅 RTP & Free spins";
            }
            return data.title + " - Free play - " + metadata.title;
        },
    },
};

// for games categories
module.exports = {
    lang: "en",
    tags: ["category"],
    layout: "layouts/category.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            //return `/juego/${this.slugify(data.slugOverride)}/`;
        }
    },
};

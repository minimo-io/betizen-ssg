// for games categories
module.exports = {
    lang: "pt-br",
    tags: ["category"],
    layout: "layouts/category.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            //return `/juego/${this.slugify(data.slugOverride)}/`;
        }
    },
};

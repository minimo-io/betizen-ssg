// for games categories
module.exports = {
    lang: "es",
    tags: ["category"],
    layout: "layouts/category.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            //return `/juego/${this.slugify(data.slugOverride)}/`;
        }
    },
};

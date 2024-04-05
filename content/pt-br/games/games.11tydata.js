module.exports = {
    lang: "pt-br",
    tags: ["games"],
    layout: "layouts/base.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/${data.lang}/jogo/${this.slugify(data.slugOverride)}/`;
        }
    },
};

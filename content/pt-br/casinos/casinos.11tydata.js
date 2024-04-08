module.exports = {
    lang: "pt-br",
    tags: ["casinos"],
    layout: "layouts/base.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `${data.lang}/cassino/${this.slugify(data.slugOverride)}/`;
        }
    },
};

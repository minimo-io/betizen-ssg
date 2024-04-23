const metadata = require("../../../_data/metadata.js");

module.exports = {
    lang: "pt-br",
    tags: ["provider"],
    layout: "layouts/single-provider.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/${data.lang}/fornecedor/${this.slugify(
                data.slugOverride
            )}/`;
        }
    },
    eleventyComputed: {
        pageTitle: (data) => {
            return "Slots grátis para " + data.title + " - " + metadata.title;
        },
    },
};

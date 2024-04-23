module.exports = {
    lang: "en",
    tags: ["provider"],
    layout: "layouts/single-provider.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/${data.lang}/game-provider/${this.slugify(
                data.slugOverride
            )}/`;
        }
    },
};

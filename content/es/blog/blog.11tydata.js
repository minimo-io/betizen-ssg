module.exports = {
    lang: "es",
    tags: ["posts"],
    layout: "layouts/post.njk",
    permalink: function (data) {
        // Slug override for localized URL slugs
        if (data.slugOverride) {
            return `/blog/${this.slugify(data.slugOverride)}/`;
        }
    },
};

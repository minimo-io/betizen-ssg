module.exports = {
  lang: "pt-br",
  tags: ["posts"],
  layout: "layouts/single-post.njk",
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/${data.lang}/colunas/${this.slugify(data.slugOverride)}/`;
    }
  },
};

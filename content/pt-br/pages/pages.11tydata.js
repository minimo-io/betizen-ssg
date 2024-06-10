// for games categories
module.exports = {
  lang: "pt-br",
  tags: ["page"],
  layout: "layouts/page.njk",
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/${data.lang}/${this.slugify(data.slugOverride)}/`;
    }
  },
};

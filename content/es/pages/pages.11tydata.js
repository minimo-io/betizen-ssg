// for games categories
module.exports = {
  lang: "es",
  tags: ["page"],
  layout: "layouts/page.njk",
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/${this.slugify(data.slugOverride)}/`;
    }
  },
};

// for games categories
module.exports = {
  lang: "en",
  tags: ["page"],
  layout: "layouts/page.njk",
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/${data.lang}/${this.slugify(data.slugOverride)}/`;
    }
  },
};

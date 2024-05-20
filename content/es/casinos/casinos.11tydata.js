const metadata = require("../../../_data/metadata.js");
module.exports = {
  lang: "es",
  tags: ["casinos"],
  // layout: "layouts/base.njk",
  layout: "layouts/single-casino.njk",
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/casino/${this.slugify(data.slugOverride)}/`;
    }
  },
  eleventyComputed: {
    pageTitle: (data) => {
      return data.title + " | Reseña honesta - " + metadata.title;
    },
  },
};

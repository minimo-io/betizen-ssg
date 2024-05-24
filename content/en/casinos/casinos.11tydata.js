const metadata = require("../../../_data/metadata.js");
module.exports = {
  lang: "en",
  tags: ["casinos"],
  // layout: "layouts/base.njk",
  layout: "layouts/single-casino.njk",
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `${data.lang}/online-casino/${this.slugify(data.slugOverride)}/`;
    }
  },
  eleventyComputed: {
    pageTitle: (data) => {
      return data.title + " | Honest review - " + metadata.title;
    },
  },
};

const metadata = require("../../../_data/metadata.js");
const languages = require("../../../_data/languages.js");
module.exports = {
  lang: "es",
  tags: ["bonus"],
  layout: "layouts/single-bonus.njk",
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/bonus/${this.slugify(data.slugOverride)}/`;
    }
  },
  eleventyComputed: {
    pageTitle: (data) => {
      return data.title + " - " + metadata.title;
    },
    bonus: {
      link: (data) => {
        if (!data.bonus.link && data.page.lang) {
          return languages[data.page.lang].promo.url;
        } else {
          return data.bonus.link;
        }
      },
    },
  },
};

// content/es/casinos/casinos.11tydata.js

const metadata = require("../../../_data/metadata.js");
const languages = require("../../../_data/languages.js");
module.exports = {
  lang: "pt-br",
  tags: ["forex"],
  // layout: "layouts/base.njk",
  layout: "layouts/single-forex.njk",
  permalink: function (data) {
    // Slug override for localized URL slugs
    if (data.slugOverride) {
      return `/pt-br/forex/${this.slugify(data.slugOverride)}/`;
    }
  },
  eleventyComputed: {
    pageTitle: (data) => {
      return data.title + " | Avaliação popular - " + metadata.title;
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

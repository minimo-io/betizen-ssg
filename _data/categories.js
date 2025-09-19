const languages = require("./languages.js");

module.exports = function () {
  return {
    es: buildGameCategoriesFromLanguage("es"),
    "pt-br": buildGameCategoriesFromLanguage("pt-br"),
    en: buildGameCategoriesFromLanguage("en"),
  };
};

const buildGameCategoriesFromLanguage = (lang) => {
  if (!languages[lang].categories) return [];
  let menuItems = [];
  for (const item in languages[lang].categories) {
    menuItems.push({
      text: languages[lang].categories[item].name,
      url: languages[lang].categories[item].url,
    });
  }
  return menuItems;
};

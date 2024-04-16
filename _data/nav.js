const languages = require("./languages.js");

module.exports = function () {
    return {
        es: [
            {
                text: "Casinos",
                url: "/casinos/",
                id: "term-id-5",
            },
            {
                text: "Bonos",
                url: "/bonos/",
                id: "term-id-74",
            },

            {
                text: "Juegos",
                url: "/juegos/",
                id: "term-id-4",
                children: buildGameCategoriesFromLanguage("es"),
            },
            {
                text: "Blog",
                url: "/blog/",
                id: "term-id-44",
            },
        ],
        en: [
            {
                text: "Casinos",
                url: "/en/online-casinos/",
                id: "term-id-5",
            },
            {
                text: "Bonuses",
                url: "/en/online-casino-bonuses/",
                id: "term-id-74",
            },

            {
                text: "Games",
                url: "/en/games/",
                id: "term-id-4",
                children: buildGameCategoriesFromLanguage("en"),
            },
            {
                text: "Blog",
                url: "/en/articles/",
                id: "term-id-44",
            },
        ],
        "pt-br": [
            {
                text: "Cassinos",
                url: "/pt-br/cassinos/",
                id: "term-id-5",
            },
            {
                text: "Promoções",
                url: "/pt-br/promocoes/",
                id: "term-id-74",
            },

            {
                text: "Jogos",
                url: "/pt-br/jogos/",
                id: "term-id-4",
                children: buildGameCategoriesFromLanguage("pt-br"),
            },
            {
                text: "Colunas",
                url: "/pt-br/colunas/",
                id: "term-id-44",
            },
        ],
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

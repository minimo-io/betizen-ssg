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
        text: "Cripto",
        url: "/casinos/criptomonedas/",
        id: "term-crypto",
      },
      {
        text: "Forex",
        url: "/forex/",
        id: "term-forex",
      },
      {
        text: "Binarias",
        url: "/opciones-binarias/",
        id: "term-binary",
      },

      // {
      //   text: "Afiliados",
      //   url: "/programas-de-afiliados/",
      //   id: "term-affiliates",
      // },
      // {
      //   text: "Bonos",
      //   url: "/bonos/",
      //   id: "term-id-74",
      // },
      // {
      //   text: "Blog",
      //   url: "/blog/",
      //   id: "term-blog",
      // },

      // {
      //   text: "Juegos",
      //   url: "/juegos/",
      //   id: "term-id-4",
      //   children: buildGameCategoriesFromLanguage("es"),
      // },
    ],
    en: [
      {
        text: "Casinos",
        url: "/en/online-casinos/",
        id: "term-id-5",
      },
      {
        text: "Crypto",
        url: "/en/online-casinos/crypto/",
        id: "term-crypto",
      },
      {
        text: "Forex",
        url: "/en/forex/",
        id: "term-forex",
      },
      {
        text: "Binary",
        url: "/en/binary-options/",
        id: "term-binary",
      },

      // {
      //   text: "Affiliates",
      //   url: "/en/affiliate-programs/",
      //   id: "term-affiliates",
      // },
      // {
      //   text: "Bonuses",
      //   url: "/en/online-casino-bonuses/",
      //   id: "term-id-74",
      // },
      // {
      //   text: "Blog",
      //   url: "/en/articles/",
      //   id: "term-id-44",
      // },

      // {
      //   text: "Games",
      //   url: "/en/games/",
      //   id: "term-id-4",
      //   children: buildGameCategoriesFromLanguage("en"),
      // },
    ],
    "pt-br": [
      {
        text: "Cassinos",
        url: "/pt-br/cassinos/",
        id: "term-id-5",
      },
      {
        text: "Cripto",
        url: "/pt-br/cassinos/criptomoedas/",
        id: "term-crypto",
      },
      {
        text: "Forex",
        url: "/pt-br/forex/",
        id: "term-forex",
      },
      {
        text: "Binárias",
        url: "/pt-br/opcoes-binarias/",
        id: "term-binary",
      },

      // {
      //   text: "Afiliados",
      //   url: "/pt-br/programas-afiliados/",
      //   id: "term-affiliates",
      // },
      // {
      //   text: "Promoções",
      //   url: "/pt-br/promocoes/",
      //   id: "term-id-74",
      // },

      // {
      //   text: "Jogos",
      //   url: "/pt-br/jogos/",
      //   id: "term-id-4",
      //   children: buildGameCategoriesFromLanguage("pt-br"),
      // },
      // {
      //   text: "Colunas",
      //   url: "/pt-br/colunas/",
      //   id: "term-id-44",
      // },
    ],
  };
};

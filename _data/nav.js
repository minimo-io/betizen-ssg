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
                children: [
                    { text: "Tragamonedas", url: "/juegos/tragamonedas/" },
                    { text: "Bingo electrónico", url: "/juegos/video-bingo/" },
                    { text: "Ruleta", url: "/juegos/ruleta/" },
                    { text: "Blackjack", url: "/juegos/blackjack/" },
                    {
                        text: "Premios instantáneos",
                        url: "/juegos/premios-instantaneos/",
                    },
                    { text: "Baccarat", url: "/juegos/baccarat/" },
                    { text: "Video poker", url: "/juegos/video-poker/" },
                ],
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
                children: [
                    { text: "Online Slots", url: "/en/games/free-slots/" },
                    { text: "Online Bingo", url: "/en/games/online-bingo/" },
                ],
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
                children: [
                    {
                        text: "Caça níqueis",
                        url: "/pt-br/jogos/caca-niqueis/",
                    },
                    {
                        text: "Vídeo-Bingo",
                        url: "/pt-br/jogos/video-bingo-pt/",
                    },
                    {
                        text: "Prêmios imediatos",
                        url: "/pt-br/jogos/premios-imediatos/",
                    },
                    {
                        text: "Vídeo Póker",
                        url: "/pt-br/jogos/video-poker-pt/",
                    },
                    { text: "Roleta", url: "/pt-br/jogos/roleta/" },

                    { text: "Blackjack", url: "/pt-br/jogos/blackjack-br/" },
                    { text: "Baccarat", url: "/pt-br/jogos/baccarat-br/" },
                ],
            },
            {
                text: "Colunas",
                url: "/pt-br/colunas/",
                id: "term-id-44",
            },
        ],
    };
};

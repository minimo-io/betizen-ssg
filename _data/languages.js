const metadata = require("./metadata.js");

module.exports = {
    es: {
        dir: "", // stands for the direction of the language set in the head, defaults to LTR (left to right)
        menu: {
            class: "dropdown-item font-weight-bold flag-icon-background flag-icon-es",
            name: "Español",
            flagClass: "flag-icon-es",
        },
        promo: {
            url: "https://bonusme.fun/L?tag=d_3370224m_37513c_BR_CL_CA_MX_PE&site=3370224&ad=37513",
            cta: "👉 ¿Bono de $10 para probar?",
            image: metadata.images.banners + "banner-bc-game-es.webp",
            casino: {
                logo: "/assets/imgs/casinos/888starz-logo.webp",
                name: "888Starz",
                title: "200% SOBRE EL DEPÓSITO Y 150 GIROS 🤯 ¡PROMO LIMITADA!",
                cta: "¡PROBAR SUERTE AHORA!",
            },
            external_250x250:
                '<script src="https://js.revenuenetwork.com/javascript.php?prefix=V-ibMvK6zZs5uATr4YanjGNd7ZgqdRLk&amp;media=4014&amp;campaign=1"></script>',
        },
        categories: {
            slot: { name: "Tragamonedas", url: "/juegos/tragamonedas/" },
            bingo: { name: "Bingo", url: "/juegos/video-bingo/" },
            roulette: { name: "Ruleta", url: "/juegos/ruleta/" },
            blackjack: { name: "Blackjack", url: "/juegos/blackjack/" },
            instant: {
                name: "Premios instantáneos",
                url: "/juegos/premios-instantaneos/",
            },
            baccarat: { name: "Baccarat", url: "/juegos/baccarat/" },
            poker: { name: "Video poker", url: "/juegos/video-poker/" },
        },
        texts: {
            bad: "Malo",
            average: "Medio",
            good: "Bueno",
            readMore: "Ver más",
            readLess: "Ver menos",
            slot: "Tragamonedas",
        },
    },
    "pt-br": {
        menu: {
            class: "dropdown-item flag-icon-background flag-icon-br",
            name: "Português",
            flagClass: "flag-icon-br",
        },
        promo: {
            url: "https://bonusme.fun/L?tag=d_3370224m_37513c_BR_CL_CA_MX_PE&site=3370224&ad=37513",
            cta: "👉 Bônus de R$65 para testar?",
            image: metadata.images.banners + "casino-banner-2-pt-br.webp",
            casino: {
                logo: "/assets/imgs/casinos/888starz-logo.webp",
                name: "888Starz",
                title: "200% NO DEPÓSITO E 150 GIROS GRATUITOS 🤯 PROMOÇÃO LIMITADA!",
                cta: "TENTE SUA SORTE AGORA!",
            },
            external_250x250:
                '<script src="https://js.ppincome.net/javascript.php?prefix=FJLgBR3akX5-2Obre52AsGNd7ZgqdRLk&amp;media=5118&amp;campaign=1"></script>',
        },
        categories: {
            slot: { name: "Caça níqueis", url: "/pt-br/jogos/caca-niqueis/" },
            instant: {
                name: "Prêmios imediatos",
                url: "/pt-br/jogos/premios-imediatos/",
            },
            bingo: { name: "Vídeo-Bingo", url: "/pt-br/jogos/video-bingo-pt/" },
            roulette: { name: "Roleta", url: "/pt-br/jogos/roleta/" },
            blackjack: { name: "Blackjack", url: "/pt-br/jogos/blackjack-br/" },

            baccarat: { name: "Baccarat", url: "/pt-br/jogos/baccarat-br/" },
            poker: { name: "Vídeo-Póker", url: "/pt-br/jogos/video-poker-pt/" },
        },
        texts: {
            bad: "Ruim",
            average: "Médio",
            good: "Bom",
            readMore: "Ver mais",
            readLess: "Ver menos",
            slot: "Caça-níqueis",
        },
    },
    en: {
        menu: {
            class: "dropdown-item flag-icon-background flag-icon-gb",
            name: "English",
            flagClass: "flag-icon-gb",
        },
        promo: {
            url: "https://bonusme.fun/L?tag=d_3370224m_37513c_BR_CL_CA_MX_PE&site=3370224&ad=37513",
            cta: "👉 $10 bonus to try this out?",
            image: metadata.images.banners + "casino-banner-2-en.webp",
            casino: {
                logo: metadata.images.casinos + "888starz-logo.webp",
                name: "888Starz",
                title: "200% TO DEPOSIT AND 150 FS! 🤯 <br>CANNOT MISS THIS ONE!",
                cta: "TRY YOUR LUCK NOW!",
            },
            external_250x250:
                '<script src="https://media.toxtren.com/ad.aspx?pid=101348&bid=1709"></script>',
        },
        categories: {
            slot: { name: "Online Slots", url: "/en/games/free-slots/" },
            bingo: { name: "Online Bingo", url: "/en/games/online-bingo/" },
            roulette: { name: "Roulette", url: "/en/games/online-roulette/" },
        },
        texts: {
            bad: "Bad",
            average: "Average",
            good: "Good",
            readMore: "Read more",
            readLess: "Read less",
            slot: "Slots",
        },
    },
};

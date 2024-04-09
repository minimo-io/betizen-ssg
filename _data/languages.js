module.exports = {
    es: {
        dir: "", // stands for the direction of the language set in the head, defaults to LTR (left to right)
        menu: {
            class: "dropdown-item font-weight-bold flag-icon-background flag-icon-es",
            name: "Español",
            flagClass: "flag-icon-es",
        },
        availableText: "Esta página también está disponible en:",
        categories: {
            slot: {
                name: "Tragamonedas",
                plural: "Tragamonedas",
            },
            bingo: {
                name: "Bingo",
                plural: "Bingos",
            },
        },
    },
    "pt-br": {
        menu: {
            class: "dropdown-item flag-icon-background flag-icon-br",
            name: "Português",
            flagClass: "flag-icon-br",
        },
        availableText: "Também disponivel em: ",
        categories: {
            slot: {
                name: "Caça níquel",
                plural: "Caça níqueis",
            },
            bingo: {
                name: "Vídeo bingo",
                plural: "Vídeo-Bingos",
            },
        },
    },
    en: {
        menu: {
            class: "dropdown-item flag-icon-background flag-icon-gb",
            name: "English",
            flagClass: "flag-icon-gb",
        },
        availableText: "This page is also available in:",
        categories: {
            slot: {
                name: "Slot",
                plural: "Slots",
            },
            bingo: {
                name: "Bingo",
                plural: "Bingos",
            },
        },
    },
};

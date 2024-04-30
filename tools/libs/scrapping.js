const fs = require("node:fs");
const parser = require("node-html-parser").default;
const sanitizeFrontMatter = require("./utils.js").sanitizeFrontMatter;

module.exports = {
    removeSpecialChars,
    getSlug,
    sanitize,
    sanitizeHttrack,
    extractUrlFromText,
    removeNonNumericChars,
    translateToCode,
    extractIframeSrc,
    processFile,
};

function processFile(filePath) {
    let frontMatterData = {};
    let data = fs.readFileSync(filePath, "utf8", (err, data) => {});

    let nodes = parser(data, { comment: true });

    frontMatterData.slugOverride = "";
    frontMatterData.tags = "";
    frontMatterData.title = "";
    frontMatterData.description = "";
    frontMatterData.content = "";

    frontMatterData.launch = "";

    frontMatterData.provider = {};
    frontMatterData.provider.name = "";
    frontMatterData.provider.url = "";

    frontMatterData.game = {};
    frontMatterData.game.ranking = "";
    frontMatterData.game.score = "";
    frontMatterData.game.maxWin = "";
    frontMatterData.game.paylines = "";
    frontMatterData.game.volatility = "";
    frontMatterData.game.minMaxBet = ""; // for bingo and roulette and table games
    frontMatterData.game.type = ""; // for roulette
    frontMatterData.game.cards = ""; //baccarat
    frontMatterData.game.hands = ""; // poker
    frontMatterData.game.rtp = ""; // all games

    frontMatterData.areas = {};
    frontMatterData.areas.prizes = "";
    frontMatterData.areas.functions = "";
    frontMatterData.areas.theme = "";

    frontMatterData.iframe = "";

    // first check that it is not a redirect html
    // META HTTP-EQUIV="Refresh"
    if ((isRedirectHtml = nodes.querySelector("meta[http-equiv='Refresh']"))) {
        console.log(
            `\x1b[43m> WARNING:\x1b[0m HTML Redirect for ${filePath} (not processing)`
        );
        return frontMatterData;
    }

    // cannot trust canonical for httrack files (would work for curl gets)
    // let canonical = nodes.querySelector("link[rel='canonical']");
    // frontMatterData.slugOverride = getSlug(canonical.attrs.href);
    // as an alternative to hhtrack comments would be to use meta OpenGraph property="og:url"

    if ((firstComment = nodes.querySelector("html !--"))) {
        frontMatterData.slugOverride = sanitizeHttrack(firstComment.rawText);
    } else {
        console.error("\x1b[41m> ERROR:\x1b[0m No slug, or url founded");
        process.exit();
    }

    let alternateLanguagesToProcess = buildAlternateLangs(
        nodes.querySelectorAll("link[rel='alternate']"),
        frontMatterData.slugOverride
    );
    console.log(alternateLanguagesToProcess);

    let localizedCategortyName = nodes.querySelectorAll(
        ".theme-description__list__item a"
    )[1].rawText;

    let universalCategoryName = translateCategoryToUniversalSlug(
        localizedCategortyName
    );
    if (!universalCategoryName) {
        // then try the other element in the index
        let secondTryUniversalCategoryName = translateCategoryToUniversalSlug(
            nodes.querySelectorAll(".theme-description__list__item a")[2]
                .rawText
        );
        if (!secondTryUniversalCategoryName) {
            console.error(
                "\x1b[41m> ERROR:\x1b[0m Category Name not founded: " + filePath
            );
            process.exit();
        }
    }
    frontMatterData.tags = `[${universalCategoryName}]`; // <<<<<<<<< this is key, pending

    frontMatterData.title = nodes.querySelector(
        ".profile__description__title"
    ).rawText;
    frontMatterData.title = sanitizeFrontMatter(frontMatterData.title);

    // description
    frontMatterData.description = nodes.querySelector(
        "meta[name='description']"
    ).attrs.content;
    frontMatterData.description = sanitizeFrontMatter(
        frontMatterData.description
    );
    //frontMatterData.description = `"${frontMatterData.description}"`;
    // content
    let gameContent = nodes.querySelector(".general-description");
    gameContent.lastChild.remove();
    gameContent.lastChild.remove();

    frontMatterData.content = gameContent.innerHTML;
    frontMatterData.content = frontMatterData.content
        .replace(/index.html/g, "")
        .replace(/href="\.\.\/\.\.\//g, 'href="/')
        .replace(/href="\.\.\//g, 'href="/juego/');
    //.replace(/href="(?:\.{0,2}\/)+/g, 'href="');
    //
    frontMatterData.launch = nodes.querySelector(
        ".profile__description p"
    ).rawText;

    frontMatterData.launch = removeNonNumericChars(frontMatterData.launch);
    if (frontMatterData.launch.length > 4) {
        frontMatterData.launch = frontMatterData.launch.slice(-4);
    }

    frontMatterData.provider.name = nodes.querySelector(
        ".profile__description a"
    ).firstChild.rawText;
    frontMatterData.provider.url = nodes.querySelector(
        ".profile__description a"
    ).firstChild.parentNode.attrs.href;
    frontMatterData.provider.url = frontMatterData.provider.url
        .replace("https://www.betizen.org", "")
        .replace("index.html", "")
        .replace("../..", "");

    frontMatterData.game.ranking = nodes.querySelector(".ranking-big").rawText;
    frontMatterData.game.ranking = frontMatterData.game.ranking.replace(
        /#/g,
        ""
    );

    frontMatterData.game.score = 4; // this worked via comments and never got implemented in Wordpress, so fixed

    // info boxes =======================================================

    // first box it's always RTP
    frontMatterData.game.rtp = nodes.querySelector(
        ".casino-single-featured .card-text"
    ).childNodes[0].rawText;
    frontMatterData.game.rtp = sanitize(frontMatterData.game.rtp);

    // fourth box it's always Max Win (when exists)
    if (nodes.querySelectorAll(".casino-single-featured .card-title")[3]) {
        let fourthBoxValue = nodes.querySelectorAll(
            ".casino-single-featured .card-text"
        )[3];
        frontMatterData.game.maxWin = sanitize(fourthBoxValue.rawText);
        frontMatterData.game.maxWin = removeNonNumericChars(
            frontMatterData.game.maxWin
        );
    }

    // second box title
    // "Barajas" o "Cartas" para baccarat
    // "Volatilidad" o "Volatilidade" para slots, inmediatos, blackjack
    // "Tipo" para roleta
    // "Mãos" o "Manos" para poker
    let secondDataBox = nodes.querySelectorAll(
        ".casino-single-featured .card-title"
    )[1].rawText;
    secondDataBox = sanitize(secondDataBox);
    let secondDataBoxValue = nodes.querySelectorAll(
        ".casino-single-featured .card-text"
    )[1].rawText;
    secondDataBoxValue = sanitize(secondDataBoxValue);

    // volatility
    if (
        secondDataBox == "Volatility " ||
        secondDataBox == "Volatilidad" ||
        secondDataBox == "Volatilidade"
    ) {
        frontMatterData.game.volatility = secondDataBoxValue;
    }
    // cards
    if (secondDataBox == "Barajas" || secondDataBox == "Cartas") {
        frontMatterData.game.cards = secondDataBoxValue;
    }
    // type
    if (secondDataBox == "Tipo") {
        frontMatterData.game.type = secondDataBoxValue;
    }
    // hands
    if (secondDataBox == "Mãos" || secondDataBox == "Manos") {
        frontMatterData.game.hands = secondDataBoxValue;
    }

    // third box title
    // "Min/Max" for poker, bingo, roulette, blackjack, baccarat
    // "Líneas de pago" or "Linhas de pagamento" for instant, slots
    let thirdDataBox = nodes.querySelectorAll(
        ".casino-single-featured .card-title"
    )[2].rawText;
    thirdDataBox = sanitize(thirdDataBox);
    let thirdDataBoxValue = nodes.querySelectorAll(
        ".casino-single-featured .card-text"
    )[2].rawText;
    thirdDataBoxValue = sanitize(thirdDataBoxValue);
    if (thirdDataBox == "Min/Max") {
        frontMatterData.game.minMaxBet = thirdDataBoxValue;
    }
    if (
        thirdDataBox == "Líneas de pago" ||
        thirdDataBox == "Linhas de pagamento"
    ) {
        frontMatterData.game.paylines = thirdDataBoxValue;
    }

    // AREAS LISTS =========================================================

    let listGameAreas = nodes.querySelectorAll(".list-index .badge");
    if (listGameAreas[0] && listGameAreas[1] && listGameAreas[2]) {
        frontMatterData.areas.prizes = translateToCode(
            listGameAreas[0].rawText
        );
        frontMatterData.areas.functions = translateToCode(
            listGameAreas[1].rawText
        );
        frontMatterData.areas.theme = translateToCode(listGameAreas[2].rawText);
    }

    // =====================================================================

    // iframe(src) game code fetching
    let iframeScript = nodes.querySelectorAll("script").slice(-3)[0].rawText;
    for (node of nodes.querySelectorAll("script")) {
        let firstIframeSrc = extractIframeSrc(nodes.rawText);
        if (firstIframeSrc) {
            iframeScript = firstIframeSrc;
            break;
        }
    }
    if (!iframeScript) {
        console.log("\x1b[43m> WARNING:\x1b[0m NO IFRAME");
    } else {
        if (!isValidUrl(iframeScript)) {
            console.log(
                `\x1b[43m> WARNING:\x1b[0m Not a valid Url for Iframe: ${filePath} (processing without game code)`
            );
            iframeScript = "";
        } else {
        }
    }

    frontMatterData.iframe = iframeScript;

    return frontMatterData;
}

function extractIframeSrc(htmlString) {
    const regex = /<iframe[^>]*src="(.*?)"/i;
    const match = htmlString.match(regex);
    return match ? match[1] : null;
}
function translateCategoryToUniversalSlug(categoryLocaleName) {
    let ret = "";
    categoryLocaleName = categoryLocaleName.trim();
    switch (categoryLocaleName) {
        case "Video Poker":
        case "Vídeo-Póker":
        case "Poker":
            ret = "poker";
            break;
        case "Ruleta":
        case "Roleta":
        case "Roulette":
            ret = "roulette";
            break;
        case "Blackjack":
            ret = "blackjack";
            break;
        case "Video-Bingo":
        case "Vídeo-Bingo":
        case "Bingo":
            ret = "bingo";
            break;
        case "Tragamonedas":
        case "Caça níqueis":
        case "Slots":
            ret = "slot";
            break;
        case "Prêmios imediatos":
        case "Premios Instantáneos":
        case "Instant Win":
            ret = "instant";
            break;
        case "Baccarat":
            ret = "baccarat";
            break;
    }
    return ret;
}
function translateToCode(s) {
    let ret = "";
    s = removeSpecialChars(s);

    switch (s) {
        case "Medio":
        case "Média":
        case "Average":
            ret = "average";
            break;
        case "Good":
        case "Bom":
        case "Bueno":
            ret = "good";
            break;
        case "Malo":
        case "Mau":
        case "Bad":
            ret = "bad";
            break;
    }
    return ret;
}

function removeSpecialChars(str) {
    const regex = /[^a-zA-Z]/g;
    return str.replace(regex, "");
}

function removeNonNumericChars(str) {
    return str.replace(/\D/g, "");
}

function extractUrlFromText(s) {
    let regex = /www\.[^\s]+/;
    let match = s.match(regex);
    if (match) {
        return match[0];
    } else {
        regex = /https?:\/\/[^\s]+/;
        match = s.match(regex);
        return match ? match[0] : null;
    }
}
function sanitizeHttrack(s) {
    s = extractUrlFromText(s);
    s = sanitize(s);
    s = s.replace("www.betizen.org/", "");
    let as = s.split("/").slice(-2, -1);

    return as[0];
}

function sanitize(s) {
    return s.trim();
}

function getSlug(href) {
    let aHref = href.split("/");

    return aHref[aHref.length - 2];
}

const isValidUrl = (s) => {
    if (s.substr(0, 2) == "//") s = "https:" + s;

    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

function buildAlternateLangs(nodes, forThisOriginalSlug) {
    let langs = [];
    for (node of nodes) {
        if (node.attrs.hreflang) {
            let cleanSlug = node.attrs.href;
            let finalSlug = cleanSlug
                .replace("/index.html", "")
                .replace("index.html", "")
                .split("/")
                .filter(function (item) {
                    return item !== "";
                })
                .slice(-1);

            //console.log(finalSlug);
            langs.push({
                // original: forThisOriginalSlug,
                hreflang: node.attrs.hreflang,
                slug: finalSlug,
            });
            if (node.attrs.hreflang == "pt" && finalSlug[0] == "") {
                console.error(
                    "\x1b[41m> ERROR:\x1b[0m No slug, or url founded for present alternate"
                );
                console.error(node.attrs.href);
                console.error(finalSlug);
                console.error(cleanSlug.split("/"));
                process.exit();
            }
        }
    }
    return langs;
}

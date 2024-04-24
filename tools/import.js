const fs = require("node:fs");

const parser = require("node-html-parser").default;
const content = "dasdasdasd";

try {
    // fs.readFile("./tools/simple.html", "utf8", (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     let nodes = parser(data);

    //     console.log(nodes.querySelector("p").childNodes[0].rawText);
    // });

    let filename = "test.html";
    // filename = "test-slot-broken.html";
    // filename = "test-blackjack.html";
    // filename = "test-instant.html";
    // filename = "test-baccarat-es.html";
    // filename = "test-roulette.html";
    // filename = "test-poker.html";
    filename = "test-slot-en.html";

    fs.readFile("./tools/" + filename, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let nodes = parser(data, { comment: true });

        let frontMatterData = {};
        frontMatterData.slugOverride = "";
        frontMatterData.tags = "";
        frontMatterData.title = "";
        frontMatterData.description = "";
        frontMatterData.launch = "";
        frontMatterData.providerName = "";
        frontMatterData.providerUrl = "";
        frontMatterData.ranking = "";
        frontMatterData.score = "";
        frontMatterData.maxWin = "";
        frontMatterData.paylines = "";
        frontMatterData.volatility = "";
        frontMatterData.minMaxBet = ""; // for bingo and roulette and table games
        frontMatterData.type = ""; // for roulette
        frontMatterData.cards = ""; //baccarat
        frontMatterData.hands = ""; // poker
        frontMatterData.rtp = ""; // all games
        frontMatterData.prizes = "";
        frontMatterData.functions = "";
        frontMatterData.theme = "";
        frontMatterData.iframe = "";

        let canonical = nodes.querySelector("link[rel='canonical']");
        if (canonical) {
            frontMatterData.slugOverride = getSlug(canonical.attrs.href);
        } else {
            if ((firstComment = nodes.querySelector("html !--"))) {
                frontMatterData.slugOverride = sanitizeHttrack(
                    firstComment.rawText
                );
            } else {
                console.log("No slug, or url founded");
                process.exit();
            }
        }

        frontMatterData.tags = "[slot]"; // <<<<<<<<< this is key, pending
        frontMatterData.title = nodes.querySelector(
            ".profile__description__title"
        ).rawText;
        frontMatterData.description = nodes.querySelector(
            "meta[name='description']"
        ).attrs.content;
        frontMatterData.launch = nodes.querySelector(
            ".profile__description"
        ).rawText;
        frontMatterData.launch = removeNonNumericChars(frontMatterData.launch);

        frontMatterData.providerName = nodes.querySelector(
            ".profile__description a"
        ).firstChild.rawText;
        frontMatterData.providerUrl = nodes.querySelector(
            ".profile__description a"
        ).firstChild.parentNode.attrs.href;
        frontMatterData.providerUrl = frontMatterData.providerUrl.replace(
            "https://www.betizen.org",
            ""
        );

        frontMatterData.ranking = nodes.querySelector(".ranking-big").rawText;
        frontMatterData.ranking.replace("#", "");

        frontMatterData.score = 4; // lets fix this since this worked via comments and never got implemented in Wordpress

        // info boxes =======================================================

        // first box it's always RTP
        frontMatterData.rtp = nodes.querySelector(
            ".casino-single-featured .card-text"
        ).childNodes[0].rawText;
        frontMatterData.rtp = sanitize(frontMatterData.rtp);

        // fourth box it's always Max Win (when exists)
        if (nodes.querySelectorAll(".casino-single-featured .card-title")[3]) {
            let fourthBoxValue = nodes.querySelectorAll(
                ".casino-single-featured .card-text"
            )[3];
            frontMatterData.maxWin = sanitize(fourthBoxValue.rawText);
            frontMatterData.maxWin = removeNonNumericChars(
                frontMatterData.maxWin
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
            frontMatterData.volatility = secondDataBoxValue;
        }
        // cards
        if (secondDataBox == "Barajas" || secondDataBox == "Cartas") {
            frontMatterData.cards = secondDataBoxValue;
        }
        // type
        if (secondDataBox == "Tipo") {
            frontMatterData.type = secondDataBoxValue;
        }
        // hands
        if (secondDataBox == "Mãos" || secondDataBox == "Manos") {
            frontMatterData.hands = secondDataBoxValue;
        }

        // third box title
        // "Min/Max" for poker, bingo, roulette, blackjack, baccarat
        // "Líneas de pago" or "Linhas de pagamento" for instant, slots
        let thirdDataBox = nodes.querySelectorAll(
            ".casino-single-featured .card-title"
        )[2].rawText;
        thirdDataBox = sanitize(thirdDataBox);

        if (thirdDataBox == "Min/Max") {
            frontMatterData.minMaxBet = thirdDataBox;
        }
        if (
            thirdDataBox == "Líneas de pago" ||
            thirdDataBox == "Linhas de pagamento"
        ) {
            frontMatterData.paylines = thirdDataBox;
        }

        // AREAS LISTS =========================================================

        frontMatterData.prizes = "";
        frontMatterData.functions = "";
        frontMatterData.theme = "";

        let listGameAreas = nodes.querySelectorAll(".list-index .badge");
        if (listGameAreas[0] && listGameAreas[1] && listGameAreas[2]) {
            frontMatterData.prizes = translateToCode(listGameAreas[0].rawText);
            frontMatterData.functions = translateToCode(
                listGameAreas[1].rawText
            );
            frontMatterData.theme = translateToCode(listGameAreas[2].rawText);
        }

        // =====================================================================

        let iframeScript = nodes
            .querySelectorAll("script")
            .slice(-3)[0].rawText;

        iframeScript = extractIframeSrc(iframeScript);

        frontMatterData.iframe = iframeScript;

        console.log(frontMatterData);
    });

    // fs.writeFileSync("./tools/test.txt", content);
} catch (err) {
    console.error(err);
}

function getSlug(href) {
    let aHref = href.split("/");

    return aHref[aHref.length - 2];
}
function sanitize(s) {
    return s.trim();
}
function sanitizeHttrack(s) {
    s = extractUrlFromText(s);
    s = sanitize(s);
    s = s.replace("www.betizen.org/", "");
    let as = s.split("/").slice(-2, -1);

    // if (!s.startsWith("https://")) {
    //     return "https://" + s;
    // }

    return as[0];
}
function extractUrlFromText(s) {
    // const regex = /(?:https?:\/\/)?www\.[^\s]+/;
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
function removeNonNumericChars(str) {
    return str.replace(/\D/g, "");
}
function removeSpecialChars(str) {
    const regex = /[^a-zA-Z]/g;
    return str.replace(regex, "");
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
function extractIframeSrc(htmlString) {
    const regex = /<iframe[^>]*src="(.*?)"/i;
    const match = htmlString.match(regex);
    return match ? match[1] : null;
}

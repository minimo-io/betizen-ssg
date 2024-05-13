const fs = require("node:fs");
const path = require("node:path");
const parser = require("node-html-parser").default;
const download = require("image-downloader");
const {
    getFileExtension,
    sanitizeFrontMatter,
    convertImageToWebp,
} = require("./utils.js");
const delay = async (time) => new Promise((res) => setTimeout(res, time));

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
    delay,
};

async function processFile(
    filePath,
    imagesOutputDir,
    processImages,
    processExtraLangs,
    currentLang
) {
    let frontMatterData = {};
    let postImages = {};

    let data = fs.readFileSync(filePath, "utf8", (err, data) => {});

    let nodes = parser(data, { comment: true });

    let alternateLanguagesToProcess = [];

    // images for a later getter
    postImages.logo = "";
    postImages.hero = "";
    postImages.splash = "";

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

    // get other languages to process
    if (processExtraLangs) {
        alternateLanguagesToProcess = buildAlternateLangs(
            nodes.querySelectorAll("link[rel='alternate']"),
            frontMatterData.slugOverride
        );
    }

    // process images
    if (processImages == true) {
        postImages = getImages(nodes);
        if (postImages.logo) {
            await downloadImage(
                "logo",
                postImages.logo,
                frontMatterData.slugOverride,
                imagesOutputDir
            );
        }

        if (postImages.hero) {
            await downloadImage(
                "hero",
                postImages.hero,
                frontMatterData.slugOverride,
                imagesOutputDir
            );
        }

        if (postImages.splash) {
            await downloadImage(
                "splash",
                postImages.splash,
                frontMatterData.slugOverride,
                imagesOutputDir
            );
        }

        await delay(2000);
    }
    // create a delay after downloading image set

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
            // if no way to find the category then choose a default
            universalCategoryName = "slot";
            console.error(
                "\x1b[41m> ERROR:\x1b[0m Category Name not founded (default added): " +
                    filePath
            );
            // process.exit();
        }
    }
    frontMatterData.tags = `[${universalCategoryName}]`; // <<<<<<<<< this is key, use for listings

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
    if (nodes.querySelector(".profile__description a").firstChild) {
        frontMatterData.provider.name = nodes.querySelector(
            ".profile__description a"
        ).firstChild.rawText;
    } else {
        frontMatterData.provider.name = "Neko Games";
    }
    if (
        (frontMatterData.provider.url = nodes.querySelector(
            ".profile__description a"
        ).firstChild)
    ) {
        frontMatterData.provider.url = nodes.querySelector(
            ".profile__description a"
        ).firstChild.parentNode.attrs.href;
        frontMatterData.provider.url = frontMatterData.provider.url
            .replace("https://www.betizen.org", "")
            .replace("index.html", "")
            .replace("../..", "");
    } else {
        if (currentLang == "es") {
            frontMatterData.provider.url = "/proveedor/neko-games-2/";
        } else if (currentLang == "pt" || currentLang == "pt-br") {
            frontMatterData.provider.url = "/pt-br/fornecedor/neko-games-br/";
        } else if (currentLang == "en") {
            frontMatterData.provider.url = "/en/game-provider/neko-games/";
        }
    }

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

    return {
        frontMatter: frontMatterData,
        alternateLangs: alternateLanguagesToProcess,
    };
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
    //s = removeSpecialChars(s);
    s = s.replace("∼ ", "");
    s = s.replace("✓ ", "");
    s = s.replace("&#10003; ", "");
    s = s.replace("- ", "");
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

function extractUrlFromText(s, useHttps) {
    let regex = /www\.[^\s]+/;
    let match = s.match(regex);
    if (match || useHttps) {
        return match[0];
    } else {
        regex = /https?:\/\/[^\s]+/;
        match = s.match(regex);
        return match ? match[0] : null;
    }
}
function sanitizeHttrack(s) {
    s = extractUrlFromText(s, true);
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
        // avoid es hreflang when importing
        if (node.attrs.hreflang && node.attrs.hreflang != "es") {
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

async function downloadImage(type, url, fileBaseName, output) {
    // url: https://i0.wp.com/www.betizen.org/wp-content/uploads/2022/11/conquestera-gamebeat-logo.png?resize=180%2C180&ssl=1
    // dest: __dirname + "/"

    let fileExtension = getFileExtension(url);

    if (fileExtension) {
        let destinationFile = `${output}${fileBaseName}-${type}.${fileExtension}`;
        const options = {
            url: url,
            dest: destinationFile,
        };
        // before downloading the image check that it is not already downloaded
        let triggerDownload = true;
        let newFinalFile = destinationFile
            .replace(".png", ".webp")
            .replace(".jpg", ".webp")
            .replace(".jpeg", ".webp");
        // console.log(fs.existsSync(newFinalFile));
        if (fs.existsSync(newFinalFile)) {
            // webp image already exists
            triggerDownload = false;
        } else if (fs.existsSync(destinationFile)) {
            // now check if its ok, trying to catch error on conversion
            console.log("> Image already exists, convert it");
            try {
                let convertResult = await convertImageToWebp(
                    destinationFile,
                    newFinalFile
                );
                triggerDownload = false;
            } catch (error) {
                // remove old image and download again
                console.log("\x1b[43m> COULD NOT CONVERT IMAGE\x1b[0m ");
                fs.unlinkSync(destinationFile);
                triggerDownload = true;
            }
        }
        // if we need to download then do it
        if (triggerDownload) {
            await download
                .image(options)
                .then(({ filename }) => {
                    console.log(`Downloaded: ${filename}`);
                    // convert to webp if needed
                    // DELETED: Convert images to webp in another script
                })
                .catch((err) => {
                    console.log(
                        "\x1b[43m> WARNING:\x1b[0m Error downloading image: " +
                            url
                    );
                    console.error(err);
                });
        }
    }
}

function getImages(node) {
    // get logo
    let postLogo = node.querySelector(".profile__avatar img");
    // get hero
    let postHero = node.querySelector(".profile__hero");
    postHeroString = "";
    if (postHero.attrs.style) {
        postHeroString = "https://" + extractUrlFromText(postHero.attrs.style);
        if (postHeroString.slice(-2) == ");") {
            postHeroString = postHeroString.slice(0, -2);
        }
    }
    // get splash
    let postSplash = node.querySelector(".feature-screenshot img");

    return {
        logo: postLogo.attrs.src || "",
        hero: postHeroString,
        splash: postSplash.attrs.src || "",
    };
}

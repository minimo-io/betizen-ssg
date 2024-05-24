const fs = require("node:fs");
const path = require("node:path");
const parser = require("node-html-parser").default;
const download = require("image-downloader");

const {
  getFileExtension,
  sanitizeFrontMatter,
  convertImageToWebp,
  getFirstRedirectLink,
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
  processProvidersFile,
  processCasinosFile,
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
      nodes.querySelectorAll(".theme-description__list__item a")[2].rawText
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
    .replace(/href="\.\.\/\.\.\//g, 'href="/');
  if (currentLang == "es")
    frontMatterData.content.replace(/href="\.\.\//g, 'href="/juego/');
  if (currentLang == "pt")
    frontMatterData.content.replace(/href="\.\.\//g, 'href="/pt-br/jogo/');
  if (currentLang == "en")
    frontMatterData.content.replace(/href="\.\.\//g, 'href="/en/game/');

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
  frontMatterData.game.ranking = frontMatterData.game.ranking.replace(/#/g, "");

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
    frontMatterData.areas.prizes = translateToCode(listGameAreas[0].rawText);
    frontMatterData.areas.functions = translateToCode(listGameAreas[1].rawText);
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

async function processProvidersFile(
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
  postImages.character = "";

  frontMatterData.slugOverride = "";
  frontMatterData.title = "";
  frontMatterData.description = "";

  frontMatterData.color = ""; // #eb5d33
  // frontMatterData.site = ""; // https://neko.games/
  frontMatterData.featured = ""; // true || false, frontmatter boolean
  frontMatterData.founded = "";
  //frontMatterData.headquarters = "";

  frontMatterData.content = "";

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
    postImages = getProviderImages(nodes);
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
        "char",
        postImages.hero,
        frontMatterData.slugOverride,
        imagesOutputDir
      );
    }
    await delay(2000);
  }

  // title
  frontMatterData.title = nodes.querySelector(
    ".profile__description__title"
  ).rawText;
  frontMatterData.title = sanitizeFrontMatter(frontMatterData.title);

  // description
  if (nodes.querySelector("meta[name='description']")) {
    frontMatterData.description = nodes.querySelector(
      "meta[name='description']"
    ).attrs.content;
    if (frontMatterData.description.length > 155) {
      frontMatterData.description =
        frontMatterData.description.substr(0, 150) + "...";
    }
    frontMatterData.description = sanitizeFrontMatter(
      frontMatterData.description
    );
  }

  // get color code
  let hexColor = getHexCodes(nodes.querySelector(".profile__hero").attrs.style);
  frontMatterData.color = `'${hexColor}'`;

  // featured
  frontMatterData.featured = "false"; // true || false, frontmatter boolean

  // founded year
  frontMatterData.founded = nodes.querySelector(
    ".profile__description p"
  ).innerText;
  frontMatterData.founded = removeNonNumericChars(frontMatterData.founded);

  // content
  frontMatterData.content = nodes.querySelector(
    ".catalog-description"
  ).innerHTML;
  frontMatterData.content = frontMatterData.content
    .replace(/index.html/g, "")
    .replace(/href="\.\.\/\.\.\//g, 'href="/');
  if (currentLang == "es") {
    frontMatterData.content.replace(/href="\.\.\//g, 'href="/juego/');
    frontMatterData.content = frontMatterData.content.replace(
      /href\=\"..\//,
      'href="/proveedor/'
    );
  }

  if (currentLang == "pt") {
    frontMatterData.content.replace(/href="\.\.\//g, 'href="/pt-br/jogo/');
    frontMatterData.content = frontMatterData.content.replace(
      /href\=\"..\//,
      'href="/pt-br/fornecedor/'
    );
  }

  if (currentLang == "en") {
    frontMatterData.content.replace(/href="\.\.\//g, 'href="/en/game/');
    frontMatterData.content = frontMatterData.content.replace(
      /href\=\"..\//,
      'href="/en/game-provider/'
    );
  }

  return {
    frontMatter: frontMatterData,
    alternateLangs: alternateLanguagesToProcess,
  };
}

async function processCasinosFile(
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
  postImages.splash = "";

  frontMatterData.slugOverride = "";
  frontMatterData.title = "";
  frontMatterData.description = "";

  frontMatterData.excerpt = "";
  frontMatterData.operator = "";

  frontMatterData.gradient = {};
  frontMatterData.gradient.start = "";
  frontMatterData.gradient.end = "";

  frontMatterData.bonus = {};
  frontMatterData.bonus.title = "";
  frontMatterData.bonus.text = "";
  frontMatterData.bonus.link =
    "https://bonusme.fun/L?tag=d_3370224m_37513c_BR_CL_CA_MX_PE&site=3370224&ad=37513"; // add default in case there no one to parse from html

  // details: good, average, bad
  frontMatterData.details = {};
  frontMatterData.details.games = "";
  frontMatterData.details.promotions = "";
  frontMatterData.details.customerSupport = "";
  frontMatterData.details.design = "";
  frontMatterData.details.license = "";
  frontMatterData.details.affiliateProgram = "";

  frontMatterData.maxWidthdrawal = ""; // "$10.000"
  frontMatterData.minDeposit = ""; // "$10"
  frontMatterData.minWidthdrawal = ""; // "$10"
  frontMatterData.license = ""; // Malta
  frontMatterData.reputation = {};
  frontMatterData.reputation.code = ""; //"fair"
  frontMatterData.reputation.text = ""; //"<p>Test</p>"
  frontMatterData.ranking = 0; //5
  frontMatterData.score = 0; // 4

  frontMatterData.content = "";

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

  frontMatterData.title = `"${nodes
    .querySelector(".profile__description__title")
    .innerText.replace("&#038;", "&")}"`;

  if (nodes.querySelector("meta[name='description']")) {
    frontMatterData.description = nodes.querySelector(
      "meta[name='description']"
    ).attrs.content;
    if (frontMatterData.description.length > 155) {
      frontMatterData.description =
        frontMatterData.description.substr(0, 150) + "...";
    }
    frontMatterData.description = sanitizeFrontMatter(
      frontMatterData.description
    );
  }

  frontMatterData.excerpt = `"${nodes
    .querySelector(".product p.mb-3")
    .innerHTML.replace(/\"/g, "'")
    .replace(/(\r\n|\n|\r)/gm, "")}"`;

  if (nodes.querySelector(".profile__description p.d-sm-block")) {
    frontMatterData.operator = nodes.querySelector(
      ".profile__description p.d-sm-block"
    ).innerText;
    frontMatterData.operator = frontMatterData.operator
      .replace("Operado por ", "")
      .replace("Operated by ", "")
      .replace(",", "");
    frontMatterData.operator = `"${frontMatterData.operator}"`;
  }

  frontMatterData.gradient = {};
  let hexColors = extractHexColors(
    nodes.querySelector(".profile__hero").attrs.style
  );
  frontMatterData.gradient.start = `#${hexColors[0]}`;
  frontMatterData.gradient.end = `#${hexColors[1]}`;

  if (nodes.querySelector(".card-bonus")) {
    frontMatterData.bonus.title = nodes
      .querySelector(".card-bonus .card-title")
      .innerText.replace("&nbsp;", "")
      .trim();
    frontMatterData.bonus.text = nodes
      .querySelector(".card-bonus .card-text")
      .innerText.trim();

    frontMatterData.bonus.link = nodes
      .querySelector(".card-bonus .btn-bonus")
      .attrs.href.replace("index.html", "")
      .replace("../..", "https://www.betizen.org");

    // if internal affiliate link, get the first redirect
    if (frontMatterData.bonus.link.includes("https://www.betizen.org")) {
      console.log("> Scanning first link from redirect...");
      frontMatterData.bonus.link = await getFirstRedirectLink(
        frontMatterData.bonus.link
      );
    }
  }

  // details: good, average, bad
  let allDetails;
  if ((allDetails = nodes.querySelectorAll(".list-index a"))) {
    frontMatterData.details.games = translateToCode(
      allDetails[0].querySelector(".badge").innerText
    );
    frontMatterData.details.promotions = translateToCode(
      allDetails[1].querySelector(".badge").innerText
    );
    frontMatterData.details.customerSupport = translateToCode(
      allDetails[2].querySelector(".badge").innerText
    );
    frontMatterData.details.design = translateToCode(
      allDetails[3].querySelector(".badge").innerText
    );
    if (allDetails[4] && allDetails[4].querySelector(".badge")) {
      frontMatterData.details.license = translateToCode(
        allDetails[4].querySelector(".badge").innerText
      );
    }
    // some casinos do not have an affiliate program menu index
    if (allDetails[5] && allDetails[5].querySelector(".badge")) {
      frontMatterData.details.affiliateProgram = translateToCode(
        allDetails[5].querySelector(".badge").innerText
      );
    }
  }

  // cards
  let allCards;
  if ((allCards = nodes.querySelectorAll(".casino-single-featured .col-6"))) {
    frontMatterData.maxWidthdrawal = allCards[0]
      .querySelector(".card-text")
      .innerText.replace("\n", "")
      .trim(); // "$10.000"
    frontMatterData.maxWidthdrawal = `"${frontMatterData.maxWidthdrawal}"`;
    frontMatterData.minDeposit = allCards[1]
      .querySelector(".card-text")
      .innerText.replace("\n", "")
      .trim(); // "$10"
    frontMatterData.minDeposit = `"${frontMatterData.minDeposit}"`;
    frontMatterData.minWidthdrawal = allCards[2]
      .querySelector(".card-text")
      .innerText.replace("\n", "")
      .trim(); // "$10"
    frontMatterData.minWidthdrawal = `"${frontMatterData.minWidthdrawal}"`;
    frontMatterData.license = allCards[3]
      .querySelector(".card-text")
      .innerText.replace("\n", "")
      .replace("&nbsp;", "")
      .trim(); // Malta
    frontMatterData.license = `"${frontMatterData.license}"`;
  }

  // reputation
  frontMatterData.reputation.code = getReputationCode(
    nodes.querySelector(".btn-casino-reputation").attrs.class
  ); //"fair"

  frontMatterData.reputation.text = frontMatterData.excerpt
    .replace(/\"/g, "")
    .replace(/\'/g, "");

  frontMatterData.ranking = nodes.querySelector(".ranking-big").innerText; // 5
  frontMatterData.ranking = removeNonNumericChars(frontMatterData.ranking) * 1;
  frontMatterData.score =
    nodes.querySelector(".rating-display").attrs.title * 1; // 4

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
  // lang
  if (currentLang == "es") {
    frontMatterData.content = nodes
      .querySelector(".general-description")
      .innerHTML.replace(/\.\.\/\.\./g, "/")
      .replace(/href\=\"\/\//g, 'href="/')
      .replace(/index\.html/g, "");
  } else if (currentLang == "pt-br" || currentLang == "pt") {
    frontMatterData.content = nodes
      .querySelector(".general-description")
      .innerHTML.replace(/\.\.\/\.\./g, "/")
      .replace(/href\=\"\/\//g, 'href="/pt-br/')
      .replace(/index\.html/g, "");
  } else if (currentLang == "en") {
    frontMatterData.content = nodes
      .querySelector(".general-description")
      .innerHTML.replace(/\.\.\/\.\./g, "/")
      .replace(/href\=\"\/\//g, 'href="/en/')
      .replace(/index\.html/g, "");
  }

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
            "\x1b[43m> WARNING:\x1b[0m Error downloading image: " + url
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

function getProviderImages(node) {
  // get logo
  let postLogo = node.querySelector(".profile__avatar img");
  // get hero
  let postChar = node.querySelector(".tax-sticky img");

  return {
    logo: postLogo ? postLogo.attrs.src : "",
    hero: postChar ? postChar.attrs.src : "",
  };
}

function getHexCodes(str) {
  const regex = /(?<=background-image:.*?)#[0-9a-f]{6}/i;
  const match = str.match(regex);

  if (match) {
    return match[0];
  } else {
    return false;
  }
}
function extractHexColors(str) {
  const regex = /#([0-9A-Fa-f]{6})/g; // Regex for 6-digit hex codes
  const colors = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    colors.push(match[1]); // Capture group 1 (hex code)
  }
  return colors;
}
function getReputationCode(s) {
  // fair, acceptable, caution, dangerous
  if (s.includes("btn-success")) {
    return "fair";
  }
  if (s.includes("btn-info")) {
    return "acceptable";
  }
  if (s.includes("btn-warning")) {
    return "caution";
  }
  if (s.includes("btn-danger")) {
    return "dangerous";
  }
}

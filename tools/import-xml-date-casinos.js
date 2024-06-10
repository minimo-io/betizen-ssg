// This importer will scan a given xml file, use this slug to open an njk and update its front-matter
// @author: minimo.io

const fs = require("node:fs");
const path = require("node:path");
const frontMatter = require("front-matter");
const parser = require("node-html-parser").default;
const createFrontMatter = require("./libs/createFrontMatter.js");
const openFrontMatterFile = require("./libs/utils.js").openFrontMatterFile;

try {
  const importXmlFile = "./tools/betizen-sitemaps/casinos-XML Sitemap.xml";
  const postType = "casinos"; // must be the post type inside the ./content/{language_code} directory

  const xmlStats = fs.statSync(importXmlFile);
  if (xmlStats.isFile()) {
    console.log("> Let's process the xml");
    let data = fs.readFileSync(importXmlFile, "utf8", (err, data) => {});
    let nodes = parser(data, { comment: true });
    for (url of nodes.querySelectorAll("url")) {
      let location = url.querySelector("loc").innerHTML;
      let lastMod, changeFreq;
      if (url.querySelector("lastmod")) {
        lastMod = url.querySelector("lastmod").innerHTML;
      } else if (url.querySelector("changefreq")) {
        changeFreq = url.querySelector("changefreq").innerHTML;
      }

      // get language from url
      let urlLang;
      if (location.includes("https://www.betizen.org/en/")) {
        urlLang = "en";
      } else if (location.includes("https://www.betizen.org/pt-br/")) {
        urlLang = "pt-br";
      } else {
        urlLang = "es";
      }

      // create file slug
      let fileSlug = location
        .replace("https://www.betizen.org", "")
        .replace("/en/", "")
        .replace("/pt-br/", "")
        .replace("/jogo", "")
        .replace("/game", "")
        .replace("/juego", "")
        .replace("/casino", "")
        .replace(/\//g, "");

      if (fileSlug != "" && urlLang == "es") {
        // problem is most posts share the filename of the spanish lang, not their own slug
        // this is in order for the i18n to work
        // only exception is when a game/casino/etc is not in spanish
        // let's start for the first case
        let eleventyFile = `./content/${urlLang}/${postType}/${fileSlug}.njk`;

        try {
          let dataNjk = fs.readFileSync(
            eleventyFile,
            "utf8",
            (err, data) => {}
          );

          // add the date to the front matter to the string and re-save the file
          // only in case it does not exists
          let frontMatterParsed = frontMatter(dataNjk);

          if (lastMod) {
            // frontMatterParsed.attributes.date = lastMod;
            let updatedFrontMatter = dataNjk.replace(
              "---\nslugOverride:",
              `---\ndate: "${lastMod}"\nslugOverride:`
            );

            // save file with updates
            try {
              if (!frontMatterParsed.attributes.date) {
                fs.writeFileSync(eleventyFile, updatedFrontMatter);
                console.log(`File updated: ${eleventyFile}`);
              } else {
                console.log("> Date already exists: " + eleventyFile);
              }

              // process the rest of the languages files if they exist
              let eleventyFilePT = `./content/pt-br/${postType}/${fileSlug}.njk`;
              let eleventyFileEN = `./content/en/${postType}/${fileSlug}.njk`;

              let frontMatterPT = openFrontMatterFile(eleventyFilePT);
              let frontMatterEN = openFrontMatterFile(eleventyFileEN);

              // Portuguese
              if (frontMatterPT && !frontMatterPT.frontMatter.attributes.date) {
                console.log("> Processing PT");
                let updatedFrontMatter = frontMatterPT.content.replace(
                  "---\nslugOverride:",
                  `---\ndate: "${lastMod}"\nslugOverride:`
                );
                fs.writeFileSync(eleventyFilePT, updatedFrontMatter);
              }
              // English
              if (frontMatterEN && !frontMatterEN.frontMatter.attributes.date) {
                console.log("> Processing EN");
                let updatedFrontMatter = frontMatterEN.content.replace(
                  "---\nslugOverride:",
                  `---\ndate: "${lastMod}"\nslugOverride:`
                );
                fs.writeFileSync(eleventyFileEN, updatedFrontMatter);
              }
            } catch (error) {
              console.error(error);
              process.exit();
            }
          } else {
            console.log("> No date in xml for file: " + eleventyFile);
          }
        } catch (error) {
          console.error("> ERROR: Could not open file");
          process.exit();
        }
      }

      //   console.log(location);
      //   if (lastMod) console.log(lastMod);
      //   if (changeFreq) console.log(changeFreq);
    }
  }
} catch (error) {
  console.error(error);
}

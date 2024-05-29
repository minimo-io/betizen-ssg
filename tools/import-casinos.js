const fs = require("node:fs");
const path = require("node:path");
const { processCasinosFile, delay } = require("./libs/scrapping.js");
// const delay = require("./libs/scrapping.js").delay;
const createFrontMatter = require("./libs/createFrontMatter.js");

try {
  const filePath = "./tools/casino/";
  const filesOutput = "./content/es/casinos/";
  const imagesFilesOutput = `${__dirname}/../public/imgs/casinos/`;
  const processExtraLangs = true;
  let processImages = true;
  let currentLang = "es"; // for now: es, pt, en

  // start processing
  fs.readdirSync(filePath).map(async (fileName) => {
    const fileCompletePath = path.join(filePath, fileName);

    const fileStat = fs.statSync(fileCompletePath);
    if (fileStat.isDirectory()) {
      //console.log(`Is a directory: ${fileCompletePath}`);
      // read the subdirectory (eg. for games and process the index.html file)

      let fileNames = fs.readdirSync(fileCompletePath);

      for (subFile of fileNames) {
        const subFileCompletePath = fileCompletePath + "/" + subFile;

        const subFileStat = fs.statSync(subFileCompletePath);

        if (subFileStat.isFile()) {
          if (subFile == "index.html") {
            console.log(`> Processing... ${subFileCompletePath}`);
            let processResult = await processCasinosFile(
              subFileCompletePath,
              imagesFilesOutput,
              processImages,
              processExtraLangs,
              currentLang
            );

            if (processResult.frontMatter && processResult.frontMatter != {}) {
              //   // write the base lang front matter
              let baseFileNameOutputForAllLanguages = `${processResult.frontMatter.slugOverride}.njk`;

              let creationResult = createFrontMatter(
                processResult.frontMatter,
                `${filesOutput}${baseFileNameOutputForAllLanguages}`
              );

              // if all ok then process the rest of files, if needed
              if (creationResult === true && processExtraLangs) {
                //  process all alternate languages
                for (alternateLang of processResult.alternateLangs) {
                  // check if portuguese file exists and read it
                  let altFilePath = "";
                  let outputBase = "";
                  if (alternateLang.hreflang == "pt") {
                    altFilePath = "./tools/cassino/";
                    outputBase = "./content/pt-br/casinos/";
                  } else if (alternateLang.hreflang == "en") {
                    altFilePath = "./tools/online-casino/";
                    outputBase = "./content/en/casinos/";
                  }
                  altFilePath += alternateLang.slug + "/index.html";
                  if (fs.existsSync(altFilePath)) {
                    console.log(`Processing alternate... ${altFilePath}`);
                    let altProcessResult = await processCasinosFile(
                      altFilePath,
                      false,
                      (processImages = false),
                      (processExtraLanguages = false),
                      (currentLang = alternateLang.hreflang)
                    );
                    if (altProcessResult.frontMatter != {}) {
                      let altOutputFile = outputBase + "";
                      let altFmCreationResult = createFrontMatter(
                        altProcessResult.frontMatter,
                        `${altOutputFile}${baseFileNameOutputForAllLanguages}`
                      );
                      if (altFmCreationResult === true) {
                        // delete the alt-lang file and folder to keep track of progress
                        fs.rmSync(altFilePath.replace("/index.html", ""), {
                          recursive: true,
                        });
                      }
                    }
                  } else {
                    console.log(
                      "\x1b[43m> WARNING:\x1b[0m Alternate file not founded: " +
                        altFilePath
                    );
                  }
                }
              }
            }
          }
        }
      }
      // fileNames.forEach( (subFile) => {

      // });
    } else {
      //console.log(`NOT a directory: ${fileCompletePath}`);
    }
  });
} catch (err) {
  console.error(err);
}

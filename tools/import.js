const fs = require("node:fs");
const path = require("node:path");
const processFile = require("./libs/scrapping.js").processFile;
const createFrontMatter = require("./libs/createFrontMatter.js");

try {
    const languageCode = "es";
    const filePath = "./tools/juego/";
    const filesOutput = "./content/es/games/";
    const imagesFilesOutput = `${__dirname}/../public/imgs/games/`;

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
                console.log(subFileCompletePath);
                const subFileStat = fs.statSync(subFileCompletePath);

                if (subFileStat.isFile()) {
                    if (subFile == "index.html") {
                        let frontMatterData = await processFile(
                            subFileCompletePath,
                            imagesFilesOutput,
                            languageCode
                        );

                        if (frontMatterData != {}) {
                            //console.log(`Processing... ${subFileCompletePath}`);
                            let creationResult = createFrontMatter(
                                frontMatterData,
                                filesOutput
                            );
                            //console.log(creationResult);
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

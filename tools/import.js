const fs = require("node:fs");
const path = require("node:path");
const processFile = require("./libs/scrapping.js").processFile;
const createFrontMatter = require("./libs/createFrontMatter.js");

try {
    const filePath = "./tools/juego/";
    const filesOutput = "./content/es/games/";

    // start processing
    fs.readdirSync(filePath).map((fileName) => {
        const fileCompletePath = path.join(filePath, fileName);
        const fileStat = fs.statSync(fileCompletePath);
        if (fileStat.isDirectory()) {
            //console.log(`Is a directory: ${fileCompletePath}`);
            // read the subdirectory (eg. for games and process the index.html file)
            let fileNames = fs.readdirSync(fileCompletePath);
            fileNames.forEach((subFile) => {
                const subFileCompletePath = fileCompletePath + "/" + subFile;

                const subFileStat = fs.statSync(subFileCompletePath);

                if (subFileStat.isFile()) {
                    if (subFile == "index.html") {
                        let frontMatterData = processFile(subFileCompletePath);

                        if (frontMatterData != {}) {
                            //console.log(`Processing... ${subFileCompletePath}`);
                            let creationResult = createFrontMatter(
                                frontMatterData,
                                filesOutput
                            );
                            //console.log(creationResult);
                        }
                    } else {
                        //console.log("DASDA: " + subFile);
                    }
                }
            });
        } else {
            //console.log(`NOT a directory: ${fileCompletePath}`);
        }
    });
} catch (err) {
    console.error(err);
}

const fs = require("node:fs");
const path = require("node:path");
const convertImageToWebp = require("./libs/utils.js").convertImageToWebp;
const getFileExtension = require("./libs/utils.js").getFileExtension;

const dirToCovert = `${__dirname}/../public/imgs/games/`;
fs.readdirSync(dirToCovert).map(async (fileName) => {
    const fileToConvert = fs.statSync(dirToCovert + fileName);
    if (fileToConvert.isFile() && getFileExtension(fileName) == "png") {
        let webpFilename =
            dirToCovert +
            fileName
                .replace(".png", ".webp")
                .replace(".jpg", ".webp")
                .replace(".jpeg", ".webp");
        // catch errors
        let convertResult = await convertImageToWebp(
            dirToCovert + fileName,
            webpFilename
        );
    }
});

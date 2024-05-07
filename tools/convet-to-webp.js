const fs = require("node:fs");
const path = require("node:path");
const convertImageToWebp = require("./libs/utils.js").convertImageToWebp;
const getFileExtension = require("./libs/utils.js").getFileExtension;

const dirToCovert = `${__dirname}/../public/imgs/games/`;
fs.readdirSync(dirToCovert).map(async (fileName) => {
    const fileToConvert = fs.statSync(dirToCovert + fileName);
    if (fileToConvert.isFile()) {
        console.log(getFileExtension(fileName));
    }
});

const path = require("node:path");
const fs = require("node:fs");
const webp = require("webp-converter");

module.exports = {
    sanitizeFrontMatter,
    convertImageToWebp,
    getFileExtension,
};

function sanitizeFrontMatter(s) {
    if (typeof s == "string") {
        s = s.trim();
        if (s == "-") s = `${s}`;
        s = s.replace(/\"/g, "'");
        if (isNaN(s)) {
            s = `"${s}"`;
            // console.log(isNaN(s) + " -- " + s);
        }
    }
    return s;
}
function getFileExtension(fileOrUrl) {
    let fileExtension = path.extname(fileOrUrl);
    fileExtension = fileExtension.replace(".", "");
    if (fileExtension.includes("?")) {
        fileExtension = fileExtension.split("?")[0];
    }
    return fileExtension;
}
async function convertImageToWebp(imagePath, destinationPath) {
    // convert
    let webpGenResult = webp.cwebp(
        imagePath,
        destinationPath,
        "-q 80"
        // (logging = "-v")
    );

    webpGenResult.then((response) => {
        if (typeof response == "string" && response == "") {
            fs.unlink(imagePath, (err) => {
                if (err) {
                    throw err;
                } else {
                    //console.log(`> Image converted: ${newWebpImage}`);
                    console.log(
                        `> Image converted to webp: ${destinationPath}`
                    );
                    return true;
                }
            });
        } else {
            console.log(response);
            return false;
        }
    });
}

const path = require("node:path");
const webp = require("webp-converter");

module.exports = {
    sanitizeFrontMatter,
    convertImageToWebp,
    getFileExtension,
};

function sanitizeFrontMatter(s) {
    if (typeof s == "string") {
        s = s.trim();
        if (s == "-") s = `'${s}'`;
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
function convertImageToWebp(imagePath, destinationPath) {
    // convert
    let webpGenResult = webp.cwebp(
        imagePath,
        destinationPath,
        "-q 80"
        // (logging = "-v")
    );
    webpGenResult.then((response) => {
        fs.unlink(originalImage, (err) => {
            if (err) {
                throw err;
            } else {
                //console.log(`> Image converted: ${newWebpImage}`);
            }
        });
    });
}

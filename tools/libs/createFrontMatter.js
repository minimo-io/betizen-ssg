const fs = require("node:fs");
module.exports = function (frontMatterData, output) {
    const fileOutputName = frontMatterData.slugOverride;
    let frontMatterContent = "";
    frontMatterContent += "---\n";
    frontMatterContent += parseFrontMatter(frontMatterData);
    frontMatterContent += "---\n";
    frontMatterContent += frontMatterData.content;

    // try {
    //     fs.writeFileSync(`${output}${fileOutputName}`, content);
    //     return true;
    // } catch (err) {
    //     console.error(err);
    //     return false;
    // }
};

function parseFrontMatter(frontMatterObject) {
    let ret = "";
    for (let k in frontMatterObject) {
        if (k == "content") continue;
        if (
            typeof frontMatterObject[k] == "object" &&
            frontMatterObject[k] !== null
        ) {
            ret += `${k}:\n`;
            for (let kk in frontMatterObject[k]) {
                ret += `\t${kk}: ${frontMatterObject[k][kk] || "-"}\n`;
            }
        } else {
            ret += `${k}: ${frontMatterObject[k]}\n`;
        }
    }
    return ret;
}

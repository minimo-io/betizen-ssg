const fs = require("node:fs");
const sanitizeFrontMatter = require("./utils.js").sanitizeFrontMatter;

module.exports = function (frontMatterData, outputFile) {
  let frontMatterContent = "";
  frontMatterContent += "---\n";
  frontMatterContent += parseFrontMatter(frontMatterData);
  frontMatterContent += "---\n";
  frontMatterContent += frontMatterData.content;

  try {
    if (outputFile != "") {
      if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

      try {
        fs.writeFileSync(outputFile, frontMatterContent);
        return true;
      } catch (error) {
        console.error(error);
        process.exit();
      }
    } else {
      console.error(`\x1b[41m> ERROR:\x1b[0m Filename empty '${outputFile}'`);
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
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
        if (frontMatterObject[k][kk]) {
          ret += `    ${kk}: ${sanitizeFrontMatter(
            frontMatterObject[k][kk]
          )}\n`;
        }
      }
    } else {
      ret += `${k}: ${frontMatterObject[k]}\n`;
    }
  }
  return ret;
}

const path = require("node:path");
const fs = require("node:fs");
const webp = require("webp-converter");
const axios = require("axios");

module.exports = {
  sanitizeFrontMatter,
  convertImageToWebp,
  getFileExtension,
  getFirstRedirectLink,
  generateRandomHexColor,
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
          console.log(`> Image converted to webp: ${destinationPath}`);
          return true;
        }
      });
    } else {
      console.log(response);
      return false;
    }
  });
}

async function getFirstRedirectLink(url) {
  let retUrl = "";
  try {
    let res = await axios.get(url, { maxRedirects: 0 });
    return res.request.res.headers.location;
  } catch (no200) {
    return no200.request.res.headers.location;
  }
  // await axios
  //   .get(url, { maxRedirects: 0 })
  //   .then(function (response) {
  //     return response.request.res.headers.location;
  //   })
  //   .catch(function (no200) {
  //     return no200.request.res.headers.location;
  //   });
}

function generateRandomHexColor() {
  // Generate a random integer between 0 and 0xffffff (inclusive)
  const randomColor = Math.floor(Math.random() * 16777215);

  // Convert the random number to a hexadecimal string with padding
  return "#" + randomColor.toString(16).padStart(6, "0");
}

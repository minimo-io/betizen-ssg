const metadata = require("./metadata.js");
module.exports = {
    pageTitle: (data) => data.title + " - " + metadata.title,
};

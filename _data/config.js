// _data/config.js

var pkg = require("../package.json");

module.exports = {
  isDev: process.env.NODE_ENV === "dev",
  version: pkg.version,
  versionDetails: "Nov 27, 2025",
  // Default karma used for voting buttons
  karmaPoints: 21,

  links: {
    mediaKit:
      "https://drive.google.com/file/d/1F4TnQ5foN-RXavhRTnKrxeqLhcZen7O2/view?usp=sharing",
    instagram: "https://www.instagram.com/betizen_org/",
    roadmap: "https://github.com/minimo-io/betizen-ssg",
    sponsor: "#",
    cubiqApis: "https://www.cubiq.lat",
  },

  showHomeBanner: true,
  theme: "cmyk",
};

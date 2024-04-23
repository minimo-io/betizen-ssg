const fs = require("node:fs");

const parser = require("node-html-parser").default;
const content = "dasdasdasd";

try {
    // fs.readFile("./tools/simple.html", "utf8", (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     let nodes = parser(data);

    //     console.log(nodes.querySelector("p").childNodes[0].rawText);
    // });

    fs.readFile("./tools/test.html", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let nodes = parser(data);

        let slugOverride = getSlug(
            nodes.querySelector("link[rel='canonical']").attrs.href
        );
        let tags = "[slot]";
        let title = nodes.querySelector(".profile__description__title").rawText;
        let description = nodes.querySelector("meta[name='description']").attrs
            .content;
        let launch = "";

        let providerName = "";
        let providerUrl = "";

        let ranking = "";
        let score = "";
        let rtp = "";
        let volatility = "";
        let paylines = "";
        let maxWin = "";

        let prizes = "good";
        let functions = "good";
        let theme = "good";

        let iframe = "";
        console.log(title);
        //console.log(nodes.querySelector(".general-description").innerHTML);
    });

    // fs.writeFileSync("./tools/test.txt", content);
} catch (err) {
    console.error(err);
}

function getSlug(href) {
    let aHref = href.split("/");

    return aHref[aHref.length - 2];
}

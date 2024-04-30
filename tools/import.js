const fs = require("node:fs");
const path = require("node:path");
const processFile = require("./libs/scrapping.js").processFile;

try {
    // fs.readFile("./tools/simple.html", "utf8", (err, data) => {

    const filePath = "./tools/games-test/";
    const fileName = "test-slot-broken.html";

    // const isFile = (fileName) => {
    //     return fs.lstatSync(fileName).isFile();
    // };

    fs.readdirSync(filePath).map((fileName) => {
        const fileCompletePath = path.join(filePath, fileName);
        console.log(fileCompletePath);

        let jsonString = processFile(fileCompletePath);
        console.log(jsonString);
    });

    // fs.writeFileSync("./tools/test.txt", content);
} catch (err) {
    console.error(err);
}

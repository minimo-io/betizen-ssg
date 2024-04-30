const path = require("node:path");
const processFile = require("./libs/scrapping.js").processFile;

try {
    // fs.readFile("./tools/simple.html", "utf8", (err, data) => {

    const filePath = "./tools/games-test/";
    const fileName = "test-slot-broken.html";

    processFile(path.join(filePath, fileName));

    // const isFile = (fileName) => {
    //     return fs.lstatSync(fileName).isFile();
    // };

    // fs.readdirSync(filePath).map((fileName) => {
    //     console.log(filePath + fileName);
    // });

    // process.exit();

    // fs.writeFileSync("./tools/test.txt", content);
} catch (err) {
    console.error(err);
}

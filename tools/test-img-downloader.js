const download = require("image-downloader");

const options = {
    url: "https://i0.wp.com/www.betizen.org/wp-content/uploads/2022/11/conquestera-gamebeat-logo.png?resize=180%2C180&ssl=1",
    dest: __dirname + "/",
};

console.log(__dirname);

download
    .image(options)
    .then(({ filename }) => {
        console.log(`Saved to: ${filename}`);
    })
    .catch((err) => console.log(err));

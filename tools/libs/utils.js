module.exports = {
    sanitizeFrontMatter,
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

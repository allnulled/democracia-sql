const fs = require("fs");
const files = fs.readdirSync(__dirname + "/database/query");
files.forEach(file => {
    fs.writeFileSync(__dirname + "/database/query/" + file, `module.exports = new Promise(async (ok, fail) => {
    try {
        const api = await require(__dirname + "/../../../../server/start.js");
        const { TRACE } = api;
        TRACE("Testing «${file}»");
        return ok();
    } catch(error) {
        fail(error);
    }
});`, "utf8")
});
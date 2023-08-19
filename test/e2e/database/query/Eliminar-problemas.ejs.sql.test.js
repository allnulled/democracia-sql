module.exports = new Promise(async (ok, fail) => {
    try {
        const api = await require(__dirname + "/../../../../server/start.js");
        const { TRACE } = api;
        TRACE("Testing «Eliminar-problemas.ejs.sql.test.js»");
        return ok();
    } catch(error) {
        fail(error);
    }
});
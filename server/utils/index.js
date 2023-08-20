module.exports = function(api) {
    const utils = {};
    Object.assign(utils, {
        rellenar_db: require(__dirname + "/rellenar_db.js"),
        generar_string_aleatorio: require(__dirname + "/generar_string_aleatorio.js"),
        TRACE: require(__dirname + "/TRACE.js"),
    });
    return utils;
};
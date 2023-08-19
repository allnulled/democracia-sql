const main = async function() {
    try {
        console.log("Tests...");
        await require(__dirname + "/database/query/Insertar-implementaciones-destacadas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-implementaciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-ley.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-modificacion-de-ley.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-problemas-destacados.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-problemas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-soluciones-destacadas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-soluciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-votaciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Insertar-votos.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-implementaciones-destacadas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-implementaciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-ley.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-modificacion-de-ley.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-problemas-destacados.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-problemas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-soluciones-destacadas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-soluciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-votaciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Seleccionar-votos.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-implementaciones-destacadas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-implementaciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-ley.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-modificacion-de-ley.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-problemas-destacados.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-problemas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-soluciones-destacadas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-soluciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-votaciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Actualizar-votos.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-implementaciones-destacadas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-implementaciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-ley.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-modificacion-de-ley.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-problemas-destacados.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-problemas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-soluciones-destacadas.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-soluciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-votaciones.ejs.sql.test.js");
        await require(__dirname + "/database/query/Eliminar-votos.ejs.sql.test.js");
    } catch (error) {
        console.log(error);
    }
};

module.exports = main();
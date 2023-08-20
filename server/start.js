const opciones = {
    DB_USER: "",
    DB_PASS: "",
    DB_FILE: "",
    DB_NAME: "",
    DB_HOST: null,
    DB_PORT: null,
    DB_RESET: true
};
let api = {};
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const sqlstring = require("sqlstring");
const express = require("express");
const axios = require("axios");
const body_parser = require("body-parser");
const sqlite3 = require('sqlite3').verbose();
const ruta_a_crear_db = path.resolve(__dirname, "..", "database", "Crear-base-de-datos.sql");
const ruta_a_db = path.resolve(__dirname, "..", "Base-de-datos.sqlite");
const sanitizar_valor = sqlstring.escape;
const utils = require(__dirname + "/utils/index.js")(api);
const { TRACE } = utils;
const sanitizar_id = sqlstring.escapeId;
const conectar_base_de_datos = function () {
    TRACE("conecto base de datos")
    if (opciones.DB_RESET) {
        TRACE("reseteo base de datos")
        try {
            fs.unlinkSync(ruta_a_db);
        } catch (error) { }
    }
    return new Promise((ok, fail) => {
        const db = new sqlite3.Database(ruta_a_db, function (error) {
            if (error) {
                TRACE("fallo conectando base de datos")
                console.error(error.message);
                return fail(error);
            }
            TRACE("éxito conectando base de datos")
            return ok(db);
        });
    });
};
const app = express(); 
const gestionar_error_de_peticion = function(response, error) {
    TRACE("gestiono error de petición")
    return response.json({
        error: true,
        tipo: error.name,
        mensaje: error.message,
        detalles: error.stack
    });
};
const start = async function() {
    TRACE("inicio proceso principal")
    const db = await conectar_base_de_datos();
    const gestionar_consulta_sql = function(consulta_sql) {
        TRACE("gestiono consulta SQL: " + consulta_sql)
        return new Promise((ok, fail) => {
            db.serialize(() => {
                db.all(consulta_sql, [], (error, rows) => {
                    if(error) {
                        return fail(error);
                    }
                    return ok(rows);
                });
            });
            return consulta_sql;
        });
    };
    const gestionar_consulta_sql_multiple = async function(consulta_multiple_sql) {
        TRACE("gestiono consulta SQL múltiple: " + consulta_multiple_sql.length + " caracteres.");
        const consultas_sql = consulta_multiple_sql.split(/\n\n/g);
        for(let index_consulta = 0; index_consulta < consultas_sql.length; index_consulta++) {
            const consulta_sql = consultas_sql[index_consulta];
            await gestionar_consulta_sql(consulta_sql);
        }
    }
    const inicializar_base_de_datos = async function() {
        TRACE("inicializo base de datos");
        try {
            await gestionar_consulta_sql("SELECT * FROM Usuario;");
        } catch(error) {
            const consulta_de_creacion = fs.readFileSync(ruta_a_crear_db).toString();
            await gestionar_consulta_sql_multiple(consulta_de_creacion);
        }
    };
    const gestionar_controlador_de_consulta_sql = function(fichero) {
        const fichero_de_consulta = path.resolve(__dirname, "..", "database", "query", fichero);
        const contenido_de_consulta = fs.readFileSync(fichero_de_consulta).toString();
        return async function(request, response) {
            TRACE("gestiono controlador de consulta SQL a: " + fichero);
            try {
                const consulta_renderizada = ejs.render(contenido_de_consulta, {
                    request,
                    response,
                    api
                });
                const resultado = await gestionar_consulta_sql(consulta_renderizada);
                response.json({ consulta_renderizada, resultado });
            } catch(error) {
                return gestionar_error_de_peticion(response, error);
            }
        };
    };
    const gestionar_controlador_de_iniciar_sesion = function() {
        return async function(request, response) {
            TRACE("gestiono controlador de iniciar sesión");
            try {
                const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
                const contrasenya_sanit = request.obtener_parametro_sanitizado("contrasenya");
                const usuarios_encontrados = await gestionar_consulta_sql(`SELECT * FROM Usuario WHERE nombre = ${nombre_sanit} AND contrasenya = ${contrasenya_sanit};`);
                if(usuarios_encontrados.length !== 1) {
                    throw new Error("No hay usuarios coincidentes con el nombre y la contraseña proporcionados");
                }
                const [ usuario_encontrado ] = usuarios_encontrados;
                const sesiones_encontradas = await gestionar_consulta_sql(`SELECT * FROM Sesion WHERE id_usuario = ${usuario_encontrado.id};`);
                if (sesiones_encontradas.length === 1) {
                    const [ sesion_encontrada ] = sesiones_encontradas;
                    return response.json({
                        sesion_nueva: false,
                        token_de_sesion: sesion_encontrada.token_de_sesion
                    });
                } else {
                    const token_de_sesion = sanitizar_valor(utils.generar_string_aleatorio(100));
                    await gestionar_consulta_sql(`INSERT INTO Sesion (id_usuario, token_de_sesion) VALUES (${usuario_encontrado.id}, ${token_de_sesion});`);
                    return response.json({
                        sesion_nueva: true,
                        token_de_sesion: token_de_sesion
                    });
                }
            } catch(error) {
                return gestionar_error_de_peticion(response, error);
            }
        };
    };
    const gestionar_controlador_de_cerrar_sesion = function () {
        return async function (request, response) {
            TRACE("gestiono controlador de cerrar sesión");
            try {
                const token_de_sesion = sanitizar_valor(request.headers.authorization);
                const sesiones_encontradas = await gestionar_consulta_sql(`SELECT * FROM Sesion WHERE token_de_sesion = ${token_de_sesion};`);
                if(sesiones_encontradas.length !== 1) {
                    throw new Error("No hay sesiones coincidentes con la credencial proporcionada");
                }
                await gestionar_consulta_sql(`DELETE FROM Sesion WHERE token_de_sesion = ${token_de_sesion};`);
                return response.json({
                    sesion_cerrada: true
                })
            } catch (error) {
                return gestionar_error_de_peticion(response, error);
            }

        };
    };
    const expandir_request_y_response = function() {
        return function(request, response, next) {
            request.obtener_parametro_sanitizado = function(id) {
                if(request.body && request.body[id]) {
                    return sanitizar_valor(request.body[id]);
                } else if(id in request.query) {
                    return sanitizar_valor(request.query[id]);
                }
                return undefined;
            };
            return next();
        };
    };
    await inicializar_base_de_datos();
    app.get("/", (request, response) => response.sendFile(__dirname + "/www/html/index.1.html"));
    app.use("/db", body_parser.json(), expandir_request_y_response());
    app.get("/db/Seleccionar-implementaciones-destacadas", gestionar_controlador_de_consulta_sql("Seleccionar-implementaciones-destacadas.ejs.sql"))
    app.get("/db/Seleccionar-implementaciones", gestionar_controlador_de_consulta_sql("Seleccionar-implementaciones.ejs.sql"))
    app.get("/db/Seleccionar-ley", gestionar_controlador_de_consulta_sql("Seleccionar-ley.ejs.sql"))
    app.get("/db/Seleccionar-modificacion-de-ley", gestionar_controlador_de_consulta_sql("Seleccionar-modificacion-de-ley.ejs.sql"))
    app.get("/db/Seleccionar-problemas-destacados", gestionar_controlador_de_consulta_sql("Seleccionar-problemas-destacados.ejs.sql"))
    app.get("/db/Seleccionar-problemas", gestionar_controlador_de_consulta_sql("Seleccionar-problemas.ejs.sql"))
    app.get("/db/Seleccionar-soluciones-destacadas", gestionar_controlador_de_consulta_sql("Seleccionar-soluciones-destacadas.ejs.sql"))
    app.get("/db/Seleccionar-soluciones", gestionar_controlador_de_consulta_sql("Seleccionar-soluciones.ejs.sql"))
    app.get("/db/Seleccionar-votaciones", gestionar_controlador_de_consulta_sql("Seleccionar-votaciones.ejs.sql"))
    app.get("/db/Seleccionar-votos", gestionar_controlador_de_consulta_sql("Seleccionar-votos.ejs.sql"))
    app.use("/db/Actualizar-implementaciones-destacadas", gestionar_controlador_de_consulta_sql("Actualizar-implementaciones-destacadas.ejs.sql"))
    app.use("/db/Actualizar-implementaciones", gestionar_controlador_de_consulta_sql("Actualizar-implementaciones.ejs.sql"))
    app.use("/db/Actualizar-ley", gestionar_controlador_de_consulta_sql("Actualizar-ley.ejs.sql"))
    app.use("/db/Actualizar-modificacion-de-ley", gestionar_controlador_de_consulta_sql("Actualizar-modificacion-de-ley.ejs.sql"))
    app.use("/db/Actualizar-problemas-destacados", gestionar_controlador_de_consulta_sql("Actualizar-problemas-destacados.ejs.sql"))
    app.use("/db/Actualizar-problemas", gestionar_controlador_de_consulta_sql("Actualizar-problemas.ejs.sql"))
    app.use("/db/Actualizar-soluciones-destacadas", gestionar_controlador_de_consulta_sql("Actualizar-soluciones-destacadas.ejs.sql"))
    app.use("/db/Actualizar-soluciones", gestionar_controlador_de_consulta_sql("Actualizar-soluciones.ejs.sql"))
    app.use("/db/Actualizar-votaciones", gestionar_controlador_de_consulta_sql("Actualizar-votaciones.ejs.sql"))
    app.use("/db/Actualizar-votos", gestionar_controlador_de_consulta_sql("Actualizar-votos.ejs.sql"))
    app.use("/db/Insertar-implementaciones-destacadas", gestionar_controlador_de_consulta_sql("Insertar-implementaciones-destacadas.ejs.sql"))
    app.use("/db/Insertar-implementaciones", gestionar_controlador_de_consulta_sql("Insertar-implementaciones.ejs.sql"))
    app.use("/db/Insertar-ley", gestionar_controlador_de_consulta_sql("Insertar-ley.ejs.sql"))
    app.use("/db/Insertar-modificacion-de-ley", gestionar_controlador_de_consulta_sql("Insertar-modificacion-de-ley.ejs.sql"))
    app.use("/db/Insertar-problemas-destacados", gestionar_controlador_de_consulta_sql("Insertar-problemas-destacados.ejs.sql"))
    app.use("/db/Insertar-problemas", gestionar_controlador_de_consulta_sql("Insertar-problemas.ejs.sql"))
    app.use("/db/Insertar-soluciones-destacadas", gestionar_controlador_de_consulta_sql("Insertar-soluciones-destacadas.ejs.sql"))
    app.use("/db/Insertar-soluciones", gestionar_controlador_de_consulta_sql("Insertar-soluciones.ejs.sql"))
    app.use("/db/Insertar-votaciones", gestionar_controlador_de_consulta_sql("Insertar-votaciones.ejs.sql"))
    app.use("/db/Insertar-votos", gestionar_controlador_de_consulta_sql("Insertar-votos.ejs.sql"))
    app.use("/db/Eliminar-implementaciones-destacadas", gestionar_controlador_de_consulta_sql("Eliminar-implementaciones-destacadas.ejs.sql"))
    app.use("/db/Eliminar-implementaciones", gestionar_controlador_de_consulta_sql("Eliminar-implementaciones.ejs.sql"))
    app.use("/db/Eliminar-ley", gestionar_controlador_de_consulta_sql("Eliminar-ley.ejs.sql"))
    app.use("/db/Eliminar-modificacion-de-ley", gestionar_controlador_de_consulta_sql("Eliminar-modificacion-de-ley.ejs.sql"))
    app.use("/db/Eliminar-problemas-destacados", gestionar_controlador_de_consulta_sql("Eliminar-problemas-destacados.ejs.sql"))
    app.use("/db/Eliminar-problemas", gestionar_controlador_de_consulta_sql("Eliminar-problemas.ejs.sql"))
    app.use("/db/Eliminar-soluciones-destacadas", gestionar_controlador_de_consulta_sql("Eliminar-soluciones-destacadas.ejs.sql"))
    app.use("/db/Eliminar-soluciones", gestionar_controlador_de_consulta_sql("Eliminar-soluciones.ejs.sql"))
    app.use("/db/Eliminar-votaciones", gestionar_controlador_de_consulta_sql("Eliminar-votaciones.ejs.sql"))
    app.use("/db/Eliminar-votos", gestionar_controlador_de_consulta_sql("Eliminar-votos.ejs.sql"))
    app.use("/db/Iniciar-sesion", gestionar_controlador_de_iniciar_sesion());
    app.use("/db/Cerrar-sesion", gestionar_controlador_de_cerrar_sesion());
    await new Promise((ok, fail) => {
        app.listen(5340, function() {
            TRACE("escucho en servidor:")
            console.log("  [*]     http://127.0.0.1:5340")
            ok();
        });
    });
    api = {
        start,
        opciones,
        fs,
        path,
        ejs,
        express,
        sqlite3,
        ruta_a_crear_db,
        ruta_a_db,
        TRACE,
        conectar_base_de_datos,
        db,
        app,
        start,
        gestionar_error_de_peticion,
        gestionar_consulta_sql,
        gestionar_consulta_sql_multiple,
        utils,
        inicializar_base_de_datos,
        gestionar_controlador_de_consulta_sql,
        sanitizar_valor,
        sanitizar_id
    };
    utils.rellenar_db(api);
    return api;
};

module.exports = start();
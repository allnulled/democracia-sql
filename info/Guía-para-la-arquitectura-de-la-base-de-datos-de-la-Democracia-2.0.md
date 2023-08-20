# Guía para la arquitectura de la base de datos de la Democracia 2.0

Este documento sirve para el proyecto de Democracia 2.0 porque define el esquema que debe seguir el fichero JSON que proporciona el diseño de la arquitectura de datos, tanto en cuanto a **máquinas/sistemas** o `hardware` como en **tablas/columnas** o `software`.

## Índice

- 1. [El constructor de bases de datos gráfico](#el-constructor-de-bases-de-datos-grafico).
- 2. [El esquema de datos](#el-esquema-de-datos).
  - 2.1. [Campos para atributos de tabla](#campos-para-atributos-de-tabla).
  - 2.3. [Campos para atributos de columna](#campos-para-atributos-de-columna).
- 3. [Ejemplo](#ejemplo).

-----

## El constructor de bases de datos gráfico

Para usar la aplicación de construcción de arquitecturas de bases de datos, puedes ir aquí:

- [https://allnulled.github.io/constructor-de-bases-de-datos-de-castelog/](https://allnulled.github.io/constructor-de-bases-de-datos-de-castelog/)

-----

## El esquema de datos

Estos campos se rellenan según la aplicación, y luego puedes `Guardar` y puedes `Descargar » Exportar` a un fichero JSON. El cual puedes emplazar directamente en el `src/XX.configuraciones/arquitectura.calo-db.json` del proyecto y al levantarse, el servidor se volverá a adaptar a este esquema JSON desde el `this.datos` principalmente.

-----

### Vistazo rápido de atributos de esquema especiales

Los atributos especiales de esquema son **atributos extra** de las **tablas y columnas** del **esquema** que la aplicación interpreta y usa de alguna forma especial. Fuera de estos, puedes personalizar al máximo todos los atributos que quieras asociar a tus tablas y columnas. Pero estos tienen incidencia significativa en el programa:

| Ámbito | Atributo |
| ------ | -------- |
| Tabla | [`tiene_orden`](#tabla-tiene-orden) |
| Tabla | [`tiene_conexion`](#tabla-tiene-conexion) |
| Columna | [`tiene_sql_al_crearse`](#columna-tiene-sql-al-crearse) |
| Columna | [`tiene_clave_foranea`](#tabla-tiene-clave-foranea) |

-----

### Campos para atributos de tabla

En el JSON lo encontrarás en *esquema » {tabla} » atributos_de_tabla*. En la aplicación, igual. Sus claves-valor significativos son los que siguen.

-----

#### Tabla `tiene_orden`

**Tipo:** número.

**Explicación:** número de la prioridad de la tabla. Se usará para el `CREATE TABLE` de sql. Hay que ponerlo si quieres priorizar unas tablas a otras en el orden de creación.

**Ejemplo:** si una presunta tabla `Trabajador` dependiera de `Usuario`, puedes poner en `tiene_orden` de `Usuario`, `1`, y en el de `Trabajador`, `100`. Así, te aseguras que `Usuario` se creará antes que `Trabajador`.

-----

#### Tabla `tiene_conexion`

**Tipo:** texto. Con formato especial.

**Explicación:** el formato esperado es `{Maquina}::{Proyecto}::{Conexion}`. Se usará para el `this.conexion.instancia.segun_tabla(tabla)` de la autoapi, más adelante, probablemente. Este parámetro es solo opcional e inocuo. En versiones posteriores, puede significar algo.

**Ejemplo:** `Máquina única::Proyecto único::Conexión única`.

-----

### Campos para atributos de columna

En el JSON lo encontrarás en *esquema » {tabla} » columnas » {columna} » atributos_de_columna*. Sus claves-valor significativos son:

-----

#### Columna `tiene_sql_al_crearse`

**Tipo:** texto. Con formato SQL.

**Explicación:** texto que se usará en la línea de `CREATE TABLE` del SQL.

**Ejemplo:** `VARCHAR(255)`, `INTEGER UNIQUE NOT NULL`, ...

-----

#### Columna `tiene_clave_foranea`

**Tipo:** texto. Con formato especial.

**Explicación:** texto que se usará en la línea de `CREATE TABLE` del SQL para los `FOREIGN KEY`s.

**Ejemplo:** `Usuario:id`, por ejemplo, definiría una referencia (de la columna presente) a la columna `id` de la tabla `Usuario`. Y así todo.

-----

## Ejemplo

Esto es un ejemplo de JSON representando una arquitectura:

```js
{
  "infraestructura": [
    {
      "tipo": "máquina",
      "nombre": "Maquina_unica",
      "descripcion": "",
      "url": "",
      "puerto_de_url": 80,
      "identificador_unico": "",
      "proyectos": [
        {
          "tipo": "proyecto",
          "nombre": "Proyecto_unico",
          "descripcion": "",
          "ruta_de_url": "/",
          "identificador_unico": "",
          "conexiones": [
            {
              "tipo": "conexión",
              "nombre": "Conexion_unica",
              "descripcion": "",
              "usuario_de_base_de_datos": "",
              "contrasenia_de_base_de_datos": "",
              "url_de_base_de_datos": "",
              "puerto_de_base_de_datos": "",
              "nombre_de_base_de_datos": "",
              "identificador_unico": "",
              "esta_mostrando_detalles": false
            }
          ],
          "esta_mostrando_detalles": false
        }
      ],
      "esta_mostrando_detalles": false
    }
  ],
  "esquema": {
    "{Tabla}": {
      "tipo": "tabla",
      "nombre": "Usuario",
      "descripcion": "",
      "identificador_unico": "",
      "ruta_de_url_de_tabla": "/",
      "atributos_de_tabla": {
        "tiene_clave_foranea": "si"
      },
      "columnas": {
        "nombre": {
          "tipo": "columna",
          "nombre": "nombre",
          "descripcion": "",
          "identificador_unico": "",
          "ruta_de_url_de_columna": "/",
          "atributos_de_columna": {
            "es_tal": "so",
            "es_cual": ""
          },
          "tipo_de_dato": "texto",
          "es_identificador": false,
          "es_clave_unica": false,
          "es_clave_foranea": false,
          "es_columna_virtual": false,
          "tiene_valor_por_defecto": null,
          "esta_mostrando_detalles": true
        },
        "contrasenya": {
          "tipo": "columna",
          "nombre": "contrasenya",
          "descripcion": "",
          "identificador_unico": "",
          "ruta_de_url_de_columna": "/",
          "atributos_de_columna": {},
          "tipo_de_dato": "texto",
          "es_identificador": false,
          "es_clave_unica": false,
          "es_clave_foranea": false,
          "es_columna_virtual": false,
          "tiene_valor_por_defecto": null,
          "esta_mostrando_detalles": false
        },
        "correo": {
          "tipo": "columna",
          "nombre": "correo",
          "descripcion": "",
          "identificador_unico": "",
          "ruta_de_url_de_columna": "/",
          "atributos_de_columna": {},
          "tipo_de_dato": "texto",
          "es_identificador": false,
          "es_clave_unica": false,
          "es_clave_foranea": false,
          "es_columna_virtual": false,
          "tiene_valor_por_defecto": null,
          "esta_mostrando_detalles": false
        }
      },
      "esta_mostrando_detalles": true
    },
    "Grupo": {
      "tipo": "tabla",
      "nombre": "Grupo",
      "descripcion": "",
      "identificador_unico": "",
      "ruta_de_url_de_tabla": "/",
      "atributos_de_tabla": {},
      "columnas": {
        "nombre": {
          "tipo": "columna",
          "nombre": "nombre",
          "descripcion": "",
          "identificador_unico": "",
          "ruta_de_url_de_columna": "/",
          "atributos_de_columna": {},
          "tipo_de_dato": "texto",
          "es_identificador": false,
          "es_clave_unica": false,
          "es_clave_foranea": false,
          "es_columna_virtual": false,
          "tiene_valor_por_defecto": null,
          "esta_mostrando_detalles": true
        },
        "descripcion": {
          "tipo": "columna",
          "nombre": "descripcion",
          "descripcion": "",
          "identificador_unico": "",
          "ruta_de_url_de_columna": "/",
          "atributos_de_columna": {},
          "tipo_de_dato": "texto",
          "es_identificador": false,
          "es_clave_unica": false,
          "es_clave_foranea": false,
          "es_columna_virtual": false,
          "tiene_valor_por_defecto": null,
          "esta_mostrando_detalles": true
        }
      },
      "esta_mostrando_detalles": true
    },
    "Permiso": {
      "tipo": "tabla",
      "nombre": "Permiso",
      "descripcion": "",
      "identificador_unico": "",
      "ruta_de_url_de_tabla": "/",
      "atributos_de_tabla": {},
      "columnas": {
        "nombre": {
          "tipo": "columna",
          "nombre": "nombre",
          "descripcion": "",
          "identificador_unico": "",
          "ruta_de_url_de_columna": "/",
          "atributos_de_columna": {},
          "tipo_de_dato": "texto",
          "es_identificador": false,
          "es_clave_unica": false,
          "es_clave_foranea": false,
          "es_columna_virtual": false,
          "tiene_valor_por_defecto": null,
          "esta_mostrando_detalles": true
        },
        "descripcion": {
          "tipo": "columna",
          "nombre": "descripcion",
          "descripcion": "",
          "identificador_unico": "",
          "ruta_de_url_de_columna": "/",
          "atributos_de_columna": {},
          "tipo_de_dato": "texto",
          "es_identificador": false,
          "es_clave_unica": false,
          "es_clave_foranea": false,
          "es_columna_virtual": false,
          "tiene_valor_por_defecto": null,
          "esta_mostrando_detalles": true
        }
      },
      "esta_mostrando_detalles": true
    }
  }
}
```
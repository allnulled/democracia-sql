# Guía para el desarrollador de la Democracia 2.0

A continuación se ofrece una explicación más detallada del funcionamiento de la aplicación, para usuarios avanzados en programación.

## Índice

- 1. [La ejecución](#la-ejecución)
- 2. [El ciclo de vida](#el-ciclo-de-vida)
- 3. [La carga de la API de Node.js](#la-carga-de-la-api-de-node.js)
  - 3.1. [El algoritmo de carga de la API de Node.js](#el-algoritmo-de-carga-de-la-api-de-node.js)
  - 3.2. [Ventajas del algoritmo de carga](#ventajas-del-algoritmo-de-carga)
  - 3.3. [Puntos importantes de la carga de la API de Node.js](#puntos-importantes-de-la-carga-de-la-api-de-node.js)
    - 3.3.1. [El fichero de configuraciones](#el-fichero-de-configuraciones)
    - 3.3.2. [El fichero de esquema de la base de datos](#el-fichero-de-esquema-de-la-base-de-datos)
    - 3.3.3. [El fichero de rutas](#el-fichero-de-rutas)
    - 3.3.4. [La carpeta de fiheros estáticos](#la-carpeta-de-ficheros-estáticos)
    - 3.3.5. [El fichero de la base de datos local](#el-fichero-de-la-base-de-datos-local)
    - 3.3.6. [El fichero del proceso del sistema](#el-fichero-del-proceso-del-sistema)
- 4. [El comando de consola democracia20](#el-comando-de-consola-democracia20)
  - 4.1. [El directorio de comandos de consola](#el-directorio-de-comandos-de-consola)
- 5. [Los servicios del sistema de autorización](#los-servicios-del-sistema-de-autorización)
    - 5.1. [Servicios de autorización generales](#servicios-de-autorización-generales)
    - 5.2. [Servicios de autorización específicos](#servicios-de-autorización-específicos)
- 6. [Los servicios del sistema de datos](#los-servicios-del-sistema-de-datos)
    - 6.1. [Servicio de inserción](#servicio-de-inserción)
    - 6.2. [Servicio de actualización](#servicio-de-actualización)
    - 6.3. [Servicio de eliminación](#servicio-de-eliminación)
    - 6.4. [Servicio de selección](#servicio-de-selección)

 Los servicios del sistema de datos

## La ejecución

En la [**ejecución**](#instalación-y-ejecución) se va a llamar al [`src/iniciar.js`](https://github.com/allnulled/democracia-2.0/blob/main/src/iniciar.js) del [**servidor de despliegue**](#).

A partir de ahí, la información del [**esquema de datos** en `src/autoapi/XX.configuraciones/arquitectura.calo-db.json`](https://github.com/allnulled/democracia-2.0/blob/main/src/autoapi/03.configuraciones/arquitectura.calo-db.json) puede ser utilizada en cualquier momento. Puede estar tanto en `this.configuraciones.instancia.arquitectura` como en `this.datos.esquema.instancia.arquitectura`. 

## El ciclo de vida

El programa se inicia al ejecutarse, llamando a [`src/iniciar.js`](https://github.com/allnulled/democracia-2.0/blob/main/src/iniciar.js) como se decía. Pues éste, a su vez, cargará la **API de Democracia 2.0 para Node.js** del fichero [`src/democracia.js`](https://github.com/allnulled/democracia-2.0/blob/main/src/democracia.js), que puede ser importada para otras funciones, sin necesidad de desplegar el servidor.

En [`src/democracia.js`](https://github.com/allnulled/democracia-2.0/blob/main/src/democracia.js) lo único que se hace es importar la función de [`src/autoapi/XX.utilidades/importar_directorio_recursivamente.js`](https://github.com/allnulled/democracia-2.0/blob/main/src/autoapi/XX.utilidades/importar_directorio_recursivamente.js) y llamarse con el directorio [`src/autoapi`](https://github.com/allnulled/democracia-2.0/tree/main/src/autoapi) como parámetro único. Dado que esta función será la responsable de cargar toda la **API de Democracia 2.0 para Node.js**, se explica más en profundidad en la sección de [La carga de la API de Node.js](#la-carga-de-la-api-de-node.js).

Después de esto, [`src/iniciar.js`](https://github.com/allnulled/democracia-2.0/blob/main/src/iniciar.js) continúa la ejecución llamando a la función `this.servidor.instancia.iniciar()` que se encuentra en el fichero [`src/autoapi/XX.servidor/instancia.factoria.js`](#).

## La carga de la API de Node.js

La carga de la **API de Democracia 2.0 para Node.js** se produce aplicando el algoritmo de [`src/autoapi/XX.utilidades/importar_directorio_recursivamente.js`](https://github.com/allnulled/democracia-2.0/blob/main/src/autoapi/XX.utilidades/importar_directorio_recursivamente.js) sobre el directorio [`src/autoapi`](https://github.com/allnulled/democracia-2.0/blob/main/src/autoapi).

### El algoritmo de carga de la API de Node.js

Este algoritmo recursivo tiene la capacidad de construir un objeto javascript recursivamente basándose en el árbol de ficheros y carpetas al cual apunte su parámetro único. Esto significa que la misma estructura de ficheros y carpetas nos está explicando la estructuración de la **API de Democracia 2.0 para Node.js**, que encontraremos disponible en cualquier función mediante el `this` propio. Así, estamos diciendo que el `this` de la gran mayoría de las funciones que están definidas bajo `src/autoapi` es un objeto que tiene la misma estructura que los ficheros y carpetas bajo el directorio `src/autoapi`. O que `this` = `src/autoapi` y vivecersa.

En el algoritmo, los nombres de las carpetas permiten un número delante, para indicar el orden de carga de los directorios. Así, `src/autoapi/XX.dependencias` nos dice que `this.dependencias` se va a cargar antes que `src/autoapi/XX.utilidades` (o que `this.utilidades`, vaya).

En el algoritmo, los nombres de los ficheros permiten tanto un número delante, como un tipo de fichero detrás. Los tipos de fichero indican al algoritmo cómo debe importarse ese fichero. Así, pues, se definen estos tipos de fichero en el algoritmo:

  - `*.factoria.js`. Esta fórmula importará el módulo y lo llamará como una *función factoría*, y asignará el producto.
  - `*.clase.js`. Esta fórmula sería el equivalente a un `require` normal, lo único que se entiende que se proporcionará una clase directamente desde el módulo.
  - `*.prometedor.js`. Esta fórmula importará el módulo y lo llamará como una *función factoria*, y al producto le hará un `await`.
  - `*.promesa.js`. Esta fórmula importará el módulo normal, y al producto le hará un `await`.
  - `*.estatico.js`. Esta fórmula sería el equivalente a un `require` normal.

### Ventajas del algoritmo de carga

Las grandes ventajas de este algoritmo son:

  - **La estructura de directorios y ficheros refleja/explica la API.** Solo con ver la estructura de carpetas y ficheros, puedes ver cómo está hecha la API. Esto hace que puedas entender rápidamente cómo está hecha la API, qué orden de carga sigue, y en qué consiste cada punto de ésta sin necesidad de seguir con un debugador o cosas así el recorrido de la carga. Así, encontrar las cosas también será más sencillo.
  - **Intervenir en la API es rápido.** El algoritmo va a cargar siempre todo de la misma forma. Para extender la API, pues, solo tendrás que crear un nuevo fichero. Así, escalar el desarrollo se vuelve fácil.

Principalmente, estas son las grandes ventajas: **claridad y transparencia** por un lado, y **accesibilidad y escalabilidad** por el otro.


### Puntos importantes de la carga de la API de Node.js

Generalmente, la carga de la **API de Democracia 2.0 para Node.js** va a cargar ficheros JavaScript que compondrán objetos o funciones de la API. Normalmente, funciones técnicas y objetos agrupatorios de éstas. En éstos, hay algunos puntos que interesa tener claros, para poder modificar rápidamente y así personalizar el desarrollo.

#### El fichero de configuraciones

Este está en `src/autoapi/XX.configuraciones/configuraciones.json`. No obstante, se carga por su vecino `instancia.factoria.js`, dado que los ficheros `json` son ignorados por el algoritmo.

En este fichero `json` puedes encontrar las configuraciones globales de la aplicación. En otros proyectos, se usaría un fichero `.env`, típicamente. En este caso, no, porque los ficheros `json` permiten cambiar estos datos fácilmente desde programa.

Las configuraciones globales, aquí, especifican cosas como:

 - `APLICACION_ID`: el identificador de la aplicación. Este texto será usado en todas las respuestas `json` de peticiones al servidor de la aplicación de `express`.
 - `APLICACION_PROTOCOLO`: esta configuración permite servir la aplicación mediante `https` en lugar de `http`, y así encriptar la información que viaja por internet hasta el usuario.
 - `APLICACION_PUERTO`: esta configuración permite cambiar el puerto, que por defecto es el `10100`.
 - `BASE_DE_DATOS_TIPO`: esta configuración te permite especificar, en caso de ser `local`, que use `sqlite3` y un fichero local como base de datos, o `remota` para que use `mysql2` y un host, puerto y credenciales para el servidor `mysql` correspondiente.

Puede usarse para ampliar las configuraciones del proyecto y así personalizarlo desde estos parámetros globales.

> **Esto es importante:**: *el programa puede ser seguro y puede mejorarse, pero si alguien ajeno consigue ejecutar comandos contra la base de datos (local o remota) directamente, por vía de cualquier proceso del sistema, se salta toda la seguridad que pueda haber en el servidor.*

#### El fichero de esquema de la base de datos

Otro fichero importante es `src/autoapi/XX.configuraciones/arquitectura.calo-db.json`, también cargado por su vecino `instancia.factoria.js`.

En este fichero, se especifica la estructura de datos que va a seguir la base de datos SQL (sea `sqlite` o `mysql`), y también datos que van a interesar para la creación de una **HTTP REST API automática**. Para crear este fichero, puedes ir a **[Constructor de bases de datos de Castelog](https://github.com/allnulled/constructor-de-bases-de-datos-de-castelog)**, que permite **importar y exportar** estos tipos de ficheros. Aún y así, esta aplicación permite generar ficheros `json` con demasiada amplitud. Para conocer más sobre la estructura de datos que se espera en este fichero `json`, puedes ir a este otro documento de la documentación: **[Guía para la arquitectura de la base de datos de la Democracia 2.0](./Guía-para-la-arquitectura-de-la-base-de-datos-de-la-Democracia-2.0.md)**.

La aplicación y la documentación del párrafo anterior van unidas, y son muy importantes para un desarrollo más o menos cómodo de las aplicaciones que puedan derivarse de este proyecto, como marco de trabajo inicial. Y pueden aliviar mucha complejidad y tiempo en el desarrollo de nuevos proyectos. Vale la pena. También, por ello, se documentan en una guía aparte.

#### El fichero de rutas

Otro de los ficheros de especial interés es el de `src/autoapi/XX.servidor/rutas.js`. En él, se especifican las rutas del servidor, y los controladores/mediadores que van a intervenir en él. También, como los anteriores, este fichero se carga por su vecino `instancia.factoria.js`.

El fichero de rutas puede alterarse en tiempo de ejecución, y refrescarse llamando al método `this.servidor.instancia.actualizar_enrutador()`. Él se encargará de refrescar el cacheo de módulos propio de Node.js para con el fichero de rutas, y cambiar el enrutador de la aplicación `express`, todo en tiempo de ejecución.

Aunque, si vas a hacer esto, procura no tener fallos en el código que vayas a guardar en el fichero, y así no producir errores en la compilación de éste, sobre todo si vas a hacer cambios en tiempo de ejecución. Esto ya es aparte. Pero, al menos, tener la opción de cambiar rutas en tiempo de ejecución, es posible.

Además de esto, conviene conocer que uno de los controladores que se inicia de serie con la aplicación es el que sirve ficheros estáticos desde el directorio `src/www`. Que es el punto que se explica a continuación.

#### La carpeta de ficheros estáticos

Esta carpeta está en `src/www`. Esta carpeta va a servir los ficheros `html`, `css`, `js`, las imágenes, los vídeos, los sonidos, los documentos, etc. que se quieran dejar como recursos estáticos.

Por estáticos, se entiende: no son plantillas renderizadas con lógica del servidor, no son controladores JavaScript. Son ficheros estáticos, y su carga es sencilla, rápida, predecible. Mantenerlo así implica la ventaja de que estos ficheros puedan hospedarse en otro servidor (en PHP, Java, Ruby, Python, C/C++, etc.), y funcionar igual, sin problemas. Si fueran plantillas, por ejemplo, plantillas con `ejs` que es un framework que se carga en el proyecto, ya implicaría un tiempo de respuesta aleatorio, vinculado a la lógica de dichas plantillas. No es el caso.

También se puede usar como lugar para descargar eso: documentos, vídeos, sonidos, etc. de forma global.

Cabe destacar que la aplicación del usuario final, al fin y al cabo, se sirve desde aquí. No es una aplicación enfocada al SEO, porque usa `vue2`, simplemente, no hace falta explicar más si se sabe lo que se está haciendo. Y no se contempla en ningún caso una optimización para esto, porque sería en perjuicio del tiempo de respuesta del servidor. Si se quiere SEO, se tendrá que atacar desde otro lado. De hecho, se pueden subir documentos HTML sí optimizados para el SEO en este mismo directorio `src/www`. Pero las aplicaciones `vue2` no están pensadas para eso. Y la aplicación del cliente, se hace con `castelog + vue2`. Y `vue2`, pues eso, SEO no, JavaScript dinámico y cómodo para programar y escalar, sí. Si se entiende, esto no tiene por qué colisionar con estrategias para el SEO paralelas, gestionadas desde el mismo servidor, así como *landing pages*, y otras muchas cosas *superfancy* que, **en el proceso de democratizar el poder**, no influyen en nada, o no creo que debieran.

#### La carpeta de plantillas estáticas

Al igual que en `src/www/html` puedes servir ficheros estáticos, en `src/www/ejs` puedes servir plantillas dinámicas basadas en **Embedded JavaScript o EJS**.

En ellas, puedes esperar las siguientes variables:
 
   - `framework`: aquí se carga la autoapi.
   - `request`: el objeto `Request` de `express` correspondiente a la petición de usuario.
   - `response`: el objeto `Request` de `express` correspondiente a la respuesta al usuario.
   - `require`: el método `require` de `node`.
   - `process`: la variable `process` de `node`.
   - `global`: la variable `global` de `node`.
   - `__filename`: ruta del fichero de la plantilla.
   - `__dirname`: ruta del directorio de la plantilla.



#### El fichero de la base de datos local

Este fichero es el de `src/datos_locales.sqlite3`, y guarda la base de datos cuando se usa `sqlite3` y no `mysql`. Puedes usar utilidades como `sqlitebrowser` o `mysqlworbench` o `phpmyadmin` para navegar y modificar la base de datos sin pasar por el programa de `Democracia 2.0`.

#### El fichero del proceso del sistema

Eset fichero es el de `src/pid.txt`. Este fichero contiene el número del proceso del sistema operativo que ha iniciado la aplicación.

## El comando de consola democracia20

El comando de consola `democracia20` queda disponible desde que hacemos `npm link` para incorporarlo mediante `npm`. Este comando empieza en el fichero `bin/democracia20.bin.js`. Usará los ficheros que vea necesarios. Estos son algunos ejemplos de uso:

```sh
democracia20 iniciar                  # Es igual que: npm start
democracia20 iniciar tests            # Es igual que: npm test
democracia20 iniciar tests unitarios  # Es igual que: npm test:unit
democracia20 iniciar tests e2e        # Es igual que: npm test:e2e
```

### El directorio de comandos de consola

El directorio `bin/comandos` te permite ampliar los comandos de `democracia20` rápidamente para la consola. Puedes crear ficheros y carpetas libremente. La única regla es que el comando que sí existe, es una carpeta con un fichero `index.js`. El algoritmo que compila los parámetros de consola a un objeto fácilmente legible y usable, está escrito en `bin/comandos.js`. Luego, en `bin/utilidades.js` hay funciones de utilidad común en los binarios. Finalmente, en `bin/democracia20.bin.js` se usan estos ficheros contra el directorio de `bin/comandos`, y así se permite programar comandos fácilmente. Puedes ver los ejemplos que hay dentro, en los comandos de serie.

### Los servicios del sistema de autorización

Los servicios del sistema de autorización se encuentran en la URL del servidor `/auth`. Sirven para gestionar los temas de usuarios, grupos, permisos y sesiones. Hay una serie de tablas implicadas, que son creadas automáticamente en el despliegue de no encontrarse en la base de datos.

#### Servicios de autorización generales

Los **servicios del sistema de autorización generales** son estos, y están disponibles para todos los usuarios:

 - `/auth/registrarse`. Sirve para pedir un `Usuario_no_confirmado` en la aplicación, que posteriormente se puede confirmar. Acepta como parámetros:
   - `nombre`. **Obligatorio**. Texto con el nombre de usuario.
   - `contrasenya`. **Obligatorio**. Texto con el contraseña de usuario. 
   - `correo`. **Obligatorio**. Texto con el correo de usuario. Debe tener 5 caracteres mínimo.
   - `otros`. *Opcional*. Objeto con otros datos del usuario.
 - `/auth/confirmarse`. Sirve para confirmar un `Usuario_no_confirmado` en la aplicación. Este servicio no está realmente disponible, así que la alta en el registro no corre por cuenta libre del usuario: un administrador debe ingresar manualmente las credenciales del usuario. Esto es para evitar falsaciones de la identidad, usuarios vacíos y usuarios malintencionados sin una identidad real detrás.
 - `/auth/entrar`. Sirve para abrir la sesión de usuario. Acepta los parámetros:
   - `nombre`. **Obligatorio**, alternativamente se puede usar el `correo`. Texto con el nombre de usuario.
   - `correo`. **Obligatorio**, alternativamente se puede usar el `nombre`. Texto con el correo del usuario.
   - `contrasenya`. **Obligatorio**. Texto con la contraseña del usuario.
 - `/auth/salir`. Sirve para cerrar la sesión de usuario.
   - `token_de_sesion`. **Obligatorio**. Texto con el token de sesión del usuario. Puede usarse en las cabeceras HTTP también, con el mismo nombre: `token_de_sesion`.
 - `/auth/refrescarse`. Sirve para refrescar el token de sesión del usuario.
   - `token_de_sesion`. **Obligatorio**.
 - `/auth/eliminarse`. Sirve para eliminar un usuario de la aplicación. En realidad, lo dejará inactivo, puesto que puede haber datos en la aplicación que dependan de este registro.
   - `token_de_sesion`. **Obligatorio**.
 - `/auth/autentificarse`. Sirve para obtener la autentificación de un usuario.
   - `token_de_sesion`. **Obligatorio**.

Los tests de estos servicios están dentro de `test/e2e/servicios_de_autorizacion/`.

#### Servicios de autorización específicos

Los **servicios del sistema de autorización específicos** son estos, y están disponibles para algunos usuarios solamente, con el permiso especial de `administrar autorizaciones` que es el primer permiso que se crea en la aplicación:

 - `/auth/seleccionar_grupo_de_usuario`
 - `/auth/seleccionar_grupo_segun_nombre`
 - `/auth/seleccionar_grupo`
 - `/auth/seleccionar_permiso_de_grupo`
 - `/auth/seleccionar_permiso_de_usuario`
 - `/auth/seleccionar_permiso_segun_nombre`
 - `/auth/seleccionar_permiso`
 - `/auth/seleccionar_usuario_segun_nombre`
 - `/auth/seleccionar_usuario`
 - `/auth/agregar_grupo_a_usuario`
 - `/auth/agregar_grupo`
 - `/auth/agregar_permiso_a_grupo`
 - `/auth/agregar_permiso_a_usuario`
 - `/auth/agregar_permiso`
 - `/auth/agregar_usuario`
 - `/auth/actualizar_grupo`
 - `/auth/actualizar_permiso`
 - `/auth/actualizar_usuario`
 - `/auth/eliminar_grupo_a_usuario`
 - `/auth/eliminar_grupo`
 - `/auth/eliminar_permiso_a_grupo`
 - `/auth/eliminar_permiso_a_usuario`
 - `/auth/eliminar_permiso`
 - `/auth/eliminar_usuario`

Estos servicios son usados por la aplicación del usuario automáticamente, y son considerados parte del estándar de servidor de **Democracia Directa 2.0**. Todos ellos están emplazados en la carpeta `src/autoapi/XX.autorizacion/01.utilidades/accion` (las funciones directas) y en su subcarpeta `desde_peticion` (los controladores de petición). Estos controladores son usados por el controlador en `src/autoapi/XX.servidor/controlador/factoria/sistema_de_autentificacion.js`. 

No se explican los contratos de tipos de estos servicios, porque son más internos, no pensados para explotarse desde clientes ajenos especialmente. Pero puedes ver sus códigos fuentes, y sus tests fácilmente.

Los tests de estos servicios también están dentro de `test/e2e/servicios_de_autorizacion/`.

### Los servicios del sistema de datos

Los servicios del sistema de datos sirven para interactuar con la base de datos rápidamente, sin necesidad de crear nuevos controladores específicos para resolver preguntas específicas. Son los que se explican a continuación.

#### Servicio de inserción

Se encuentra en `/datos/insertar/dato` y sirve para insertar datos en una tabla. Puedes usar los parámetros siguientes:
  - `tabla`. **Obligatorio**. Acepta un texto. Significa el nombre de la tabla de la base de datos a la que se ataca.
  - `dato`. **Obligatorio**. Acepta un objeto. Significan los datos (*pares de columna-valor*) que se van a insertar. Las propiedades del objeto deben aparecer como columnas de la tabla objetivo.

La respuesta interesante de la petición la encontrarás (usando `axios`) en: `response.data.respuesta.datos.insercion`.

El test de este servicio lo encontrarás en: `test/e2e/servicios_de_datos/Servicio de datos para «insertar_dato».js`.

#### Servicio de actualización

Se encuentra en `/datos/actualizar/dato` y sirve para cambiar datos de una tabla. Puedes usar los parámetros siguientes:
  - `tabla`. **Obligatorio**. Acepta un texto. Significa el nombre de la tabla de la base de datos a la que se ataca.
  - `id`. **Obligatorio**. Acepta un número. Significa el `id` del elemento que se va a cambiar.
  - `dato`. **Obligatorio**. Acepta un objeto. Significan los datos (*pares de columna-valor*) que se van a insertar. Las propiedades del objeto deben aparecer como columnas de la tabla objetivo.

La respuesta interesante de la petición la encontrarás (usando `axios`) en: `response.data.respuesta.datos.actualizacion`.

El test de este servicio lo encontrarás en: `test/e2e/servicios_de_datos/Servicio de datos para «actualizar_dato».js`.

#### Servicio de eliminación

Se encuentra en `/datos/eliminar/dato` y sirve para eliminar datos de una tabla. Puedes usar los parámetros siguientes:
  - `tabla`. **Obligatorio**. Acepta un texto. Significa el nombre de la tabla de la base de datos a la que se ataca.
  - `id`. **Obligatorio**. Acepta un número. Significa el `id` del elemento que se va a eliminar.

La respuesta interesante de la petición la encontrarás (usando `axios`) en: `response.data.respuesta.datos.eliminacion`.

El test de este servicio lo encontrarás en: `test/e2e/servicios_de_datos/Servicio de datos para «eliminar_dato».js`.

#### Servicio de selección

Se encuentra en `/datos/seleccionar/dato` y sirve para seleccionar datos de una tabla. Puedes usar los parámetros siguientes:
  - `tabla`. **Obligatorio**. Acepta un texto. Significa el nombre de la tabla de la base de datos a la que se ataca.
  - `filtro`. *Opcional*. Acepta un array de arrays de 2 a 4 elementos. Ejemplo:
    - `[["id","=",5]]`. Buscará elementos cuyo `id` sea igual que `5`.
    - `[["id","=",5,"valor"]]`. Lo mismo. El cuarto parámetro simplemente dice que `5` es un `valor` y no una `columna`.
    - `[["id","!=",5]]`. Buscará elementos cuyo `id` no sea igual que `5`.
    - `[["fecha_de_eliminacion","!null"]]`. Buscará elementos cuya `fecha_de_eliminacion` no sea `NULL`.
    - `[["fecha_de_eliminacion","null"]]`. Buscará elementos cuya `fecha_de_eliminacion` sí sea `NULL`.
    - `[["nombre","!like","%Carl Carlson%"]]`. Buscará elementos cuyo `nombre` no contenga el texto `Carl Carlson`.
    - `[["nombre","like","%Carl Carlson%"]]`. Buscará elementos cuyo `nombre` sí contenga el texto `Carl Carlson`.
    - `[["id","!=",5],["id","!=",6]]`. Buscará elementos cuyo `id` no sea igual que `5` ni que `6`.
    - `[["nombre","!in",["Carl","Corl","Curl"]]]`. Buscará elementos cuyo `nombre` no sea alguno de los de la lista.
    - `[["nombre","in",["Carl","Corl","Curl"]]]`. Buscará elementos cuyo `nombre` sí sea alguno de los de la lista.
    - `[["edad",">",18]]`. Buscará elementos cuya `edad` sí sea mayor que `18`.
    - `[["edad",">=",18]]`. Buscará elementos cuya `edad` sí sea mayor o igual que `18`.
    - Y así.
  - `orden`. *Opcional*. Acepta un array de arrays de 1 a 2 elementos. Ejemplo:
    - `[["id"]]`. Ordenará los elementos según el `id` en orden ascendiente.
    - `[["id","asc"]]`. Igual.
    - `[["id","desc"]]`. Ordenará los elementos según el `id` en orden descendiente.
    - `[["nombre","asc"],["id","asc"]]]`. Ordenará los elementos según el `nombre` en orden ascendiente, y si coinciden, según el `id` en orden ascendiente.
    - Y así. Por defecto, siempre se ordena por `id`, que es un campo que se crea automáticamente en todas las tablas del esquema.
  - `elementos`. *Opcional*. Acepta un número. Significa el número de elementos que quieres incluir en la página. Por defecto, siempre son `20`.
  - `pagina`. *Opcional*. Acepta un número. Significa el número de página que quieres que se entregue.
  - `busqueda`. *Opcional*. Acepta un texto. Se usará para eliminar del filtro los elementos que no contengan este texto.

La respuesta interesante de la petición la encontrarás (usando `axios`) en: `response.data.respuesta.datos.seleccion`.

El test de este servicio lo encontrarás en: `test/e2e/servicios_de_datos/Servicio de datos para «seleccionar_dato».js`.

### Las funciones del sistema de autorización de datos

El **sistema de autorización de datos** o **«rest-auth»** consiste en ganchear o *hookear* las funciones del sistema de datos, tanto de entrada como de salida, es decir *seleccionar, insert, actualizar, eliminar*, de forma que se vean obligadas a cumplir con una serie de instrucciones que se proporcionarán como parámetros en el fichero de [./src/XX.servidor/rutas.js](https://github.com/allnulled/democracia-2.0/blob/main/src/autoapi/08.servidor/rutas.js). A modo de parámetro de un factory (o función que retorna función) de un middleware. En este caso:

```
this.servidor.mediador.factoria.agregar_autorizacion({
  al: tatata,
  incluir: tatata,
  excluir: tatata,
  al_pre_aceptar: function() {},
  al_post_aceptar: function() {},
  al_pre_rechazar: function() {},
  al_post_rechazar: function() {},
});
```
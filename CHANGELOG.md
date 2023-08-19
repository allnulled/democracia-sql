-------------------------------------

19 de agosto a las 14:41pm

[x] v0.0.1-con-servicios-dummy
  [x] Los CRUD de las entidades principales...
    [x] toman parámetros de la request
    [x] los sanitizan
    [x] hacen la request
    [x] devuelven el resultado
  [-] Faltan los tests e2e con axios
  [-] Falta un servicio de SELECT plural
  [-] Falta una autentificación por sesión
    [-] Falta que los servicios de manipulación estén controlados con lógica de autorización (a manuense)
    [-] Faltaría reconfigurar los tests para que se adapten a esta nueva circunstancia.

-------------------------------------

19 de agosto a las 16:18pm

[x] Falta una tabla de Sesion
[x] Falta un usuario 'administrador' de serie
[x] Falta un servicio de login (que juegue con la tabla Sesion)
  [x] Falta un test e2e que pruebe el inicio de sesión (en la interfaz está funcionando OK)
[x] Falta un servicio de logout (que juegue con la tabla Sesion)
  [x] Falta un test e2e que pruebe el cierre de sesión (en la interfaz está funcionando OK)

[-] Falta llenar la base de datos con mierdas
[-] Falta 1 (solo 1) servicio GENÉRICO para hacer SELECTS de muchos rows que permita:
  [-] paginación (limit y offset)
  [-] filtro (where)
  [-] ordenacion (order)
  [-] búsqueda de texto (where-like 4 search)
[-] Luego podemos continuar la UI bien

-------------------------------------

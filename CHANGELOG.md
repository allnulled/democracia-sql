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

[x] v0.0.2-...
  [x] Falta una tabla de Sesion
  [x] Falta un usuario 'administrador' de serie
  [x] Falta un servicio de login (que juegue con la tabla Sesion)
    [x] Falta un test e2e que pruebe el inicio de sesión (en la interfaz está funcionando OK)
  [x] Falta un servicio de logout (que juegue con la tabla Sesion)
    [x] Falta un test e2e que pruebe el cierre de sesión (en la interfaz está funcionando OK)

-------------------------------------

19 de agosto a las 18:11pm

[x] Falta llenar la base de datos con mierdas
  [x] usuarios
  [x] problemas
[ ] Los ciclos democráticos tienen una «etapa_de_ciclo_actual». Así pueden convivirr varios ciclos democráticos, o incluso no. Es una opción.
  [ ] Si es 1, se están votando los problemas.
  [ ] Si es 2, se están votando los problemas destacados.
  [ ] Si es 3, se están votando las soluciones.
  [ ] Si es 4, se están votando las soluciones destacadas.
  [ ] Si es 5, se están votando las implementaciones.
  [ ] Si es 6, se están votando las implementaciones destacadas.
  [ ] Si es 7, se han agotado las etapas del ciclo actual.
    [ ] Los objetos que ya están asociados a ciclos democráticos agotados, de vez en cuando, se pueden limpiar, y pasar a unas tablas históricas paralelas, para que no afecten a las consultas de las etapas vivas del ciclo democrático.



[-] Falta 1 (solo 1) servicio GENÉRICO para hacer SELECTS de muchos rows que permita:
  [-] paginación (limit y offset)
  [-] filtro (where)
  [-] ordenacion (order)
  [-] búsqueda de texto (where-like 4 search)
[-] Luego podemos continuar la UI bien
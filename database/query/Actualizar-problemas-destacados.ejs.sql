<%

// Inyectar codigo anterior

const id_sanit = request.obtener_parametro_sanitizado("id");
const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");

%>

UPDATE Problema_destacado SET (
    nombre,
    descripcion
) VALUES (
    <%-nombre_sanit%>,
    <%-descripcion_sanit%>
) WHERE id = <%-id_sanit%>;
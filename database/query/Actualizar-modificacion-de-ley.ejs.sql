<%

// Inyectar codigo anterior

const id_sanit = request.obtener_parametro_sanitizado("id");
const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const uuid_sanit = request.obtener_parametro_sanitizado("uuid");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");

%>

UPDATE Modificacion_de_ley SET (
    nombre,
    uuid,
    descripcion
) VALUES (
    <%-nombre_sanit%>,
    <%-uuid_sanit%>,
    <%-descripcion_sanit%>
) WHERE id = <%-id_sanit%>;
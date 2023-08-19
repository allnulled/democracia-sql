<%

// Inyectar codigo anterior

const id_sanit = request.obtener_parametro_sanitizado("id");
const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");
const estado_sanit = request.obtener_parametro_sanitizado("estado");
const resultado_sanit = request.obtener_parametro_sanitizado("resultado");

%>

UPDATE Votacion SET (
    nombre,
    descripcion,
    estado,
    resultado
) VALUES (
    <%-nombre_sanit%>,
    <%-descripcion_sanit%>,
    <%-estado_sanit%>,
    <%-resultado_sanit%>
) WHERE id = <%-id_sanit%>;
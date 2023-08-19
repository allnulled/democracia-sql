<%

// Inyectar codigo anterior

const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const uuid_sanit = request.obtener_parametro_sanitizado("uuid");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");
const id_implementacion_original_sanit = request.obtener_parametro_sanitizado("id_implementacion_original");

%>

INSERT INTO Modificacion_de_ley (
    nombre,
    uuid,
    descripcion,
    id_implementacion_original
) VALUES (
    <%-nombre_sanit%>,
    <%-uuid_sanit%>,
    <%-descripcion_sanit%>,
    <%-id_implementacion_original_sanit%>
);
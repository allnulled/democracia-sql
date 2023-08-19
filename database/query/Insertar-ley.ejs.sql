<%

// Inyectar codigo anterior

const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const uuid_sanit = request.obtener_parametro_sanitizado("uuid");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");
const id_modificacion_de_ley_original_sanit = request.obtener_parametro_sanitizado("id_modificacion_de_ley_original");
const id_implementacion_original_sanit = request.obtener_parametro_sanitizado("id_implementacion_original");
const id_ley_padre_sanit = request.obtener_parametro_sanitizado("id_ley_padre");

%>

INSERT INTO Ley (
    nombre,
    uuid,
    descripcion,
    id_implementacion_original
) VALUES (
    <%-nombre_sanit%>,
    <%-uuid_sanit%>,
    <%-descripcion_sanit%>,
    <%-id_implementacion_original_sanit%>,
    <%-id_ley_padre_sanit%>
);
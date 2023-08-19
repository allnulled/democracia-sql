<%

// Inyectar codigo anterior

const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");
const id_usuario_creador_sanit = request.obtener_parametro_sanitizado("id_usuario_creador");
const id_problema_original_sanit = request.obtener_parametro_sanitizado("id_problema_original");

%>

INSERT INTO Solucion (
    nombre,
    descripcion,
    id_problema_original
) VALUES (
    <%-nombre_sanit%>,
    <%-descripcion_sanit%>,
    <%-id_usuario_creador_sanit%>,
    <%-id_problema_original_sanit%>
);
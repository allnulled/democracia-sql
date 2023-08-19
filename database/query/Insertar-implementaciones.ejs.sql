<%

// Inyectar codigo anterior

const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");
const id_usuario_creador_sanit = request.obtener_parametro_sanitizado("id_usuario_creador");
const id_solucion_original_sanit = request.obtener_parametro_sanitizado("id_solucion_original");

%>

INSERT INTO Implementacion (
    nombre,
    descripcion,
    id_implementacion_original
) VALUES (
    <%-nombre_sanit%>,
    <%-descripcion_sanit%>,
    <%-id_usuario_creador_sanit%>,
    <%-id_solucion_original_sanit%>
);
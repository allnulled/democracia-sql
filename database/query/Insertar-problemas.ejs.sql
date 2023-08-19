<%

// Inyectar codigo anterior

const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");
const id_usuario_creador = '0';

%>

INSERT INTO Problema (
    nombre,
    descripcion,
    id_usuario_creador
) VALUES (
    <%-nombre_sanit%>,
    <%-descripcion_sanit%>,
    <%-id_usuario_creador%>
);
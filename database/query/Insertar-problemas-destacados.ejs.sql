<%

// Inyectar codigo anterior

const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");
const id_problema_original_sanit = request.obtener_parametro_sanitizado("id_problema_original");

%>

INSERT INTO Problema_destacado (
    nombre,
    descripcion,
    id_problema_original
) VALUES (
    <%-nombre_sanit%>,
    <%-descripcion_sanit%>,
    <%-id_problema_original_sanit%>
);
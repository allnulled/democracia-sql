<%

// Inyectar codigo anterior

const nombre_sanit = request.obtener_parametro_sanitizado("nombre");
const descripcion_sanit = request.obtener_parametro_sanitizado("descripcion");
const id_solucion_original_sanit = request.obtener_parametro_sanitizado("id_solucion_original");

%>

INSERT INTO Solucion_destacada (
    nombre,
    descripcion,
    id_solucion_original
) VALUES (
    <%-nombre_sanit%>,
    <%-descripcion_sanit%>,
    <%-id_solucion_original_sanit%>
);
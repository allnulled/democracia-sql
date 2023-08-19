<%

// Inyectar codigo anterior

const id_sanit = request.obtener_parametro_sanitizado("id");

%>

SELECT * FROM Solucion_destacada WHERE id = <%-id_sanit%>;
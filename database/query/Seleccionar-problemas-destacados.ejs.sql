<%

// Inyectar codigo anterior

const id_sanit = request.obtener_parametro_sanitizado("id");

%>

SELECT * FROM Problema_destacado WHERE id = <%-id_sanit%>;
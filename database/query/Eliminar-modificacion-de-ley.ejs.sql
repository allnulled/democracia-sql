<%

// Inyectar codigo anterior

const id_sanit = request.obtener_parametro_sanitizado("id");

%>

DELETE FROM Modificacion_de_ley WHERE id = <%-id_sanit%>;
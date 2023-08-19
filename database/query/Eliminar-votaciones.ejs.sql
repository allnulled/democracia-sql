<%

// Inyectar codigo anterior

const id_sanit = request.obtener_parametro_sanitizado("id");

%>

DELETE FROM Votacion WHERE id = <%-id_sanit%>;
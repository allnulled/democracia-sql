<%

// Inyectar codigo anterior

const id_sanit = request.obtener_parametro_sanitizado("id");
const sentido_sanit = request.obtener_parametro_sanitizado("sentido");

%>

UPDATE Votacion SET (
    sentido
) VALUES (
    <%-sentido_sanit%>
) WHERE id = <%-id_sanit%>;
<%

// Inyectar codigo anterior

const id_usuario_sanit = request.obtener_parametro_sanitizado("id_usuario");
const id_votacion_sanit = request.obtener_parametro_sanitizado("id_votacion");
const sentido_sanit = request.obtener_parametro_sanitizado("sentido");

%>

INSERT INTO Voto (
    id_usuario,
    id_votacion,
    sentido
) VALUES (
    <%-id_usuario_sanit%>,
    <%-id_votacion_sanit%>,
    <%-sentido_sanit%>,
);
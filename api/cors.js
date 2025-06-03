const cors_proxy = require("cors-anywhere");

let server = null;

export default async function handler(req, res) {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        res.status(400).json({ error: "Falta el parámetro 'url' en la query." });
        return;
    }

    try {
        new URL(targetUrl); // Validación básica
    } catch (e) {
        res.status(400).json({ error: "La URL proporcionada no es válida." });
        return;
    }

    // Inicializar el proxy solo una vez
    if (!server) {
        server = cors_proxy.createServer({
            originWhitelist: [], // Permitir todos
            requireHeader: [], // Podemos omitir esto para simplificar
            removeHeaders: ['cookie', 'cookie2']
        });
    }

    // Reescribe la URL como espera cors-anywhere
    req.url = '/' + targetUrl;

    // Agrega origin ficticio si no existe
    if (!req.headers.origin) {
        req.headers.origin = 'https://demo.local';
    }

    server.emit("request", req, res);
}

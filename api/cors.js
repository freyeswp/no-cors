const cors_proxy = require("cors-anywhere");

let server = null;

export default async function handler(req, res) {
    // Inicializa el servidor proxy una sola vez (cold start)
    if (!server) {
        server = cors_proxy.createServer({
            originWhitelist: [], // Permite todos los orígenes
            requireHeader: ['origin', 'x-requested-with'], // Puede quitarse si deseas
            removeHeaders: ['cookie', 'cookie2']
        });
    }

    const targetUrl = req.query.url;

    if (!targetUrl) {
        res.status(400).json({ error: "Falta el parámetro `url` en la query." });
        return;
    }

    // Modifica la request para que cors-anywhere la interprete correctamente
    req.url = targetUrl;
    req.headers.origin = req.headers.origin || 'https://demo.local';

    // Pasa el control a cors-anywhere
    server.emit("request", req, res);
}

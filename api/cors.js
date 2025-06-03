const { createServer } = require('cors-anywhere');

const server = createServer({
    originWhitelist: [], // Permitir todos los orígenes
    requireHeader: [],
    removeHeaders: ['cookie', 'cookie2']
});

// Adaptación para Vercel serverless function
module.exports = (req, res) => {
    server.emit('request', req, res);
};

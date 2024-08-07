// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const start = require('./commads/start')
const fs =  require("node:fs/promises");

function createServer() {
    const app = express();
    const server = http.createServer(app);
    const wss = new WebSocket.Server({ server });

    // Serve static files
    app.use(express.static(path.join(__dirname, 'public')));

    // WebSocket connection
    wss.on('connection', (ws) => {
        fs.appendFile('./logs.txt', "Socket connected \n")
        ws.on('message', async(options) => {
            await start(options);
        });
    });

    return server;
}

module.exports = createServer;
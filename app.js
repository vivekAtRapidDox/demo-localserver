// app.js
const createServer = require('./server');

const PORT = 3000;
const server = createServer();

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

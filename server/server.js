require('dotenv').config();
const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Initialize Socket.IO with the server
const io = initializeSocket(server);

server.listen(port, () => console.log(`Server running on port ${port} with Socket.IO enabled`));
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the real-time code editor application
app.use(express.static('build'));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Serve the chat application
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Socket.IO connection for both applications
io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    // Handle real-time code editor functionality
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        socket.join(roomId);
        socket.to(roomId).emit(ACTIONS.JOINED, {
            clients: getClientsInRoom(roomId),
            username,
            socketId: socket.id,
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.to(roomId).emit(ACTIONS.SYNC_CODE, { socketId: socket.id, code });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.to(roomId).emit(ACTIONS.CODE_CHANGE, { code });    
    });
    

    socket.on('disconnecting', () => {
        // Implement logic to handle disconnection
    });

    function getClientsInRoom(roomId) {
        const clients = io.sockets.adapter.rooms.get(roomId);
        return [...(clients ? clients : [])];
    }

    // Handle chat application functionality
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });
});

// Start the server
const PORT = process.env.PORT || 1500;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

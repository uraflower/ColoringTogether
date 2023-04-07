const express = require('express');
const app = express();
const port = 5000;
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    //connected log
    console.log('a user connected:', socket.id);

    //disconnected log
    socket.on('disconnect', () => {
        console.log('user discnnected:', socket.id);
    });

    //chatting log
    socket.on('chat message', ({ nickname, message }) => {
        io.emit('chat message', ({ nickname, message }));
        console.log(`[server] ${nickname}: ${message}`);
    });
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
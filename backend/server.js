const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../src/components/chat/chat.html'));
});


io.on('connection', (socket) => {
    //connected log
    console.log('a user connected:', socket.id);

    //disconnected log
    socket.on('disconnect', () => {
        console.log('user discnnected:', socket.id);
    });

    //chatting log
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + msg);
    });
});


server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
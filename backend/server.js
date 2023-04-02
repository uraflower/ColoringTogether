const express = require('express');
const app = express();
const port = 5000;
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
    //connected log
    console.log('a user connected');

    //disconnected log
    socket.on('disconnect', () => {
        console.log('user discnnected');
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
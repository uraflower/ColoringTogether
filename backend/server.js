const express = require('express');
const app = express();
const port = 5000;
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const mongoose = require('mongoose');

// mongoDB와 Node 연결
const MONGO_URI = require('./config/dev');
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

// body parser 설정
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// socket 초기화
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// socket event 처리
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

// 서버 연결
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
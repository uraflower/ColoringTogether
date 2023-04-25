const express = require('express');
const app = express();
const port = 5000;
const server = require('http').createServer(app);
const mongoose = require('mongoose');

const socketio = require('./socket.js');
socketio(server);

// mongoDB와 Node 연결
const MONGO_URI = require('./config/dev');
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

// body parser 설정
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 서버 연결
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
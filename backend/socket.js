const { Server } = require("socket.io");
const { createUser, deleteUser, getUserInfo } = require("./controller/userController");
const { createRoom, getRoomList } = require("./controller/roomController");
const User = require("./model/User");

module.exports = (server) => {
    // socket 초기화
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    let roomId = 0;
    const roomList = [];

    // handle events
    io.on('connection', (socket) => {
        // connect
        console.log('a user connected:', socket.id);

        // create user
        socket.on('createUser', (nickname) => {
            createUser(socket.id, nickname);
        });

        // disconnect
        socket.on('disconnect', () => {
            deleteUser(socket.id);
            socket.leave(socket.id);
        });

        // create room
        socket.on('createRoom', (title, isMulti) => {
            owner = getUserInfo;
            console.log('************owner:', owner);
            createRoom(roomId, title, owner.ObjectId, isMulti); // room 객체 생성
            socket.join(`Room${roomId}`);
            console.log('room created:', roomId);
            roomId++;
        });

        // load all rooms from databse
        socket.emit('loadRooms', () => {
            return getRoomList();
        });

        // join room
        socket.on('joinRoom', (roomId) => {

            socket.join(roomId);
            roomList[roomId].users.push(socket.id);
            console.log(`${nickname} joined room ${roomId}`);
        })

        // send message
        socket.on('chat message', ({ nickname, message }) => {
            io.emit('chat message', ({ nickname, message }));
            console.log(`[CHAT]${nickname}: ${message}`);
        });
    });
};
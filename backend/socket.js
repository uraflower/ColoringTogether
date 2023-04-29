const { Server } = require("socket.io");
const User = require("./model/User");
const Room = require("./model/Room");

module.exports = (server, app) => {
    // socket 초기화
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    let roomId = 0;
    let roomList = [];

    // handle events
    io.on('connection', (socket) => {
        // connect
        console.log('a user connected:', socket.id);
        console.log('현재 연결된 소켓 수:', io.engine.clientsCount);

        // create user : save user info into database
        app.post('/api/addUser', async (req, res) => {
            const newUser = await User.create({
                id: req.body.id,
                nickname: req.body.nickname,
                createdAt: Date.now(),
            });
            newUser.save()
                .then(() => {
                    console.log('New User created:', newUser);
                    res.send("save user");
                })
                .catch((err) => console.error(err));
        });

        // disconnect
        socket.on('disconnect', () => {
            // socket.leave(roomName);  // 방에서 먼저 내보내기
            User.findOneAndDelete({ id: socket.id })
                .then(() => {
                    console.log('User deleted:', socket.id);
                    console.log('현재 연결된 소켓 수:', io.engine.clientsCount);
                })
                .catch((err) => console.error(err));
        });

        // load all rooms from databse
        app.get('/api/getRoomList', (req, res) => {
            Room.find()
                .then((data) => {
                    res.send(data)
                    roomList = data;
                    console.log('roomList:', roomList);
                })
                .catch((err) => console.error(err));
        });

        // create room
        app.post('/api/createRoom', async (req, res) => {
            User.findOne({ id: socket.id })
                .then(data => console.log('client:', data));

            const newRoom = await Room.create({
                id: roomId,
                title: req.body.title,
                owner: req.body.owner,
                isMulti: req.body.isMulti,
                createdAt: Date.now(),
            });
            newRoom.save()
                .then(() => {
                    console.log('New Room created:', newRoom);
                    res.send("save");
                    roomList.push(newRoom);
                    console.log('[server]roomList:', roomList);
                    io.emit('roomCreated', roomList);
                })
                .catch((err) => console.error(err));
            roomId++;

        });

        // join room
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            // roomList[roomId].users.push(socket.id);
            // console.log(`${nickname} joined room ${roomId}`);
        });

        // send message
        socket.on('chat message', ({ nickname, message }) => {
            io.emit('chat message', ({ nickname, message }));
            console.log(`[CHAT]${nickname}: ${message}`);
        });
    });
};
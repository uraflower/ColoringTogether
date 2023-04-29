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

    let roomList = [];

    // handle events
    io.on('connection', (socket) => {
        // connect
        console.log('a user connected:', socket.id);
        console.log('현재 연결된 소켓 수:', io.engine.clientsCount);

        // create user : save user info into DB
        app.post('/api/addUser', async (req, res) => {
            const newUser = await User.create({
                socketId: req.body.socketId,
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

        // disconnect : leave user from room & delete user info from DB
        socket.on('disconnect', () => {
            // socket.leave(roomName);
            User.findOneAndDelete({ socketId: socket.id })
                .exec()
                .then(() => {
                    console.log('User deleted:', socket.id);
                    console.log('현재 연결된 소켓 수:', io.engine.clientsCount);
                })
                .catch((err) => console.error(err));
        });

        // load all rooms from DB
        app.get('/api/getRoomList', (req, res) => {
            Room.find()
                .populate('owner')
                .exec()
                .then((data) => {
                    res.send(data)
                    roomList = data;
                    console.log('roomList:', roomList);
                })
                .catch((err) => console.error(err));
        });

        // get user's '_id' in DB
        const getUserObjectId = async (id) => {
            const user = await User.findOne({ socketId: id })
                .lean()
                .populate()
                .exec();
            console.log('user:', user);
            return user._id;
        };

        // create room
        app.post('/api/createRoom', async (req, res) => {
            const _owner = await getUserObjectId(req.body.owner);
            const newRoom = await Room.create({
                title: req.body.title,
                owner: _owner,
                isMulti: req.body.isMulti,
                createdAt: Date.now(),
            });

            newRoom.populate('owner')
                .then(() => {
                    newRoom.save()
                        .then(() => {
                            console.log('New Room created:', newRoom);
                            res.send("save room");
                            roomList.push(newRoom);
                            console.log('[server]roomList:', roomList);
                            io.emit('roomCreated', roomList);
                        })
                        .catch((err) => console.error(err));
                })
                .catch((err) => console.log(newRoom.owner));
        });

        // join room
        socket.on('joinRoom', () => {
            // socket.join('roomName');
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
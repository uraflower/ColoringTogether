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
            });
            newRoom.populate('owner')
                .then(() => {
                    newRoom.save()
                        .then(() => {
                            roomList.push(newRoom);
                            res.send("save room");
                            console.log('New Room created:', newRoom);
                            console.log('[server]roomList:', roomList);
                            io.emit('roomCreated', roomList);
                        })
                        .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
        });

        // join room
        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            const index = roomList.findIndex((room) => room.title === roomName);
            roomList[index].users.push(socket.id);
            console.log(`${socket.id} joined room "${roomName}"`);
            console.log('room info:', roomList[index]);
        });

        // send message
        socket.on('chat message', ({ nickname, message }) => {
            io.emit('chat message', ({ nickname, message }));
            console.log(`[CHAT]${nickname}: ${message}`);
        });

        // disconnect : leave user from room & delete user info from DB
        socket.on('disconnect', () => {
            handleUserLeave();
            deleteUser();
        });

        const handleUserLeave = () => {
            const index = roomList.findIndex((room) => room.users.includes(socket.id));
            if (index < 0) return;  // user가 아무 room에도 join하지 않은 경우

            socket.leave(roomList[index].title);
            roomList[index].users = roomList[index].users.filter(userId => userId !== socket.id);   // userId가 socket.id인 원소를 삭제
            if (roomList[index].users.length === 0) deleteRoom(index);
        }

        const deleteRoom = (index) => {
            Room.findOneAndDelete({ _id: roomList[index]._id }).exec();
            roomList.splice(index, 1);
            console.log(`room ${index} is removed.`);
            console.log('Current RoomList:', roomList);
        }

        const deleteUser = () => {
            User.findOneAndDelete({ socketId: socket.id })
                .exec()
                .then(() => {
                    console.log('User deleted:', socket.id);
                    console.log('현재 연결된 소켓 수:', io.engine.clientsCount);
                })
                .catch((err) => console.error(err));
        };
    });
};


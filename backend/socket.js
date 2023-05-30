const { Server } = require('socket.io');
const User = require('./model/User');
const Room = require('./model/Room');
const Image = require('./model/Image');

module.exports = (server, app) => {
  // socket 초기화
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  let rooms = [];

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
      newUser
        .save()
        .then(() => {
          console.log('New User created:', newUser);
          res.send('save user');
        })
        .catch((err) => console.error(err));
    });

    app.get('/api/getImages', (req, res) => {
      Image.find()
        .then((data) => {
          res.send(data);
          console.log('get images successfully');
        })
        .catch((err) => console.error(err));
    });

    // load all rooms from DB
    app.get('/api/getRooms', (req, res) => {
      Room.find()
        .populate('owner')
        .exec()
        .then((data) => {
          res.send(data);
          rooms = data;
          console.log('rooms:', rooms);
        })
        .catch((err) => console.error(err));
    });


    // send rooms data
    const sendRooms = () => {
      socket.emit('updateRooms', rooms);
    };

    // get user's '_id' in DB
    const getUserObjectId = async (id) => {
      const user = await User.findOne({ socketId: id })
        .lean()
        .populate()
        .exec();
      return user._id;
    };

    app.post('/api/getUserInfo', async (req, res) => {
      await User.findOne({ socketId: req.body.id })
        .exec()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => console.error(err));
    });

    // create room
    app.post('/api/createRoom', async (req, res) => {
      const _owner = await getUserObjectId(req.body.id);
      const newRoom = await Room.create({
        title: req.body.title,
        owner: _owner,
        image: req.body.image,
      });
      newRoom
        .populate('owner')
        .then(() => {
          newRoom
            .save()
            .then(() => {
              rooms.push(newRoom);
              res.send('save room');
              console.log('New Room created:', newRoom);
              console.log('[server]rooms:', rooms);
              sendRooms();
            })
            .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
    });

    // join room
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName);
      const index = rooms.findIndex((room) => room.title === roomName);

      // 이 방에 join한 sockets를 rooms users에 할당
      const users = [...io.sockets.adapter.rooms.get(roomName)];
      rooms[index].users = users;

      console.log(`${socket.id} joined room "${roomName}"`);
      console.log('room info:', rooms[index]);
      sendRooms();
    });

    // send message
    socket.on('chat message', ({ nickname, message }) => {
      io.emit('chat message', { nickname, message });
      console.log(`[CHAT]${nickname}: ${message}`);
    });

    socket.on('draw', ({ offsetX, offsetY, brushSize, color }) => {
      socket.broadcast.emit('draw', { offsetX, offsetY, brushSize, color });
      console.log(`someone is drawing`);
    });

    // disconnect : leave user from room & delete user info from DB
    socket.on('disconnect', () => {
      const index = rooms.findIndex((room) => room.users.includes(socket.id));

      // user가 어떤 room이든 join한 경우
      if (index !== -1) {
        socket.leaveAll(socket.id);
        rooms[index].users = rooms[index].users.filter(
          (userId) => userId !== socket.id
        );

        if (
          rooms[index].users.length &&
          rooms[index].owner.socketId == socket.id
        ) {
          updateOwner(rooms[index]);
        } else {
          removeRoom(index);
        }
        sendRooms();
      }
      deleteUser();
    });

    const removeRoom = (index) => {
      Room.findOneAndDelete({ _id: rooms[index]._id }).exec();
      rooms.splice(index, 1);
      console.log(`room ${index} is removed.`);
    };

    const updateOwner = async (room) => {
      const newOwner = await getUserObjectId(room.users[0]);
      await Room.findByIdAndUpdate(room._id, { owner: newOwner })
        .populate('owner')
        .exec();
      room.owner = await User.findById(newOwner).exec();
    };

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

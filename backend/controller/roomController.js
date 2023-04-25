const Room = require('../model/Room');

const createRoom = async (id, title, owner, isMulti) => {
    const newRoom = await Room.create({
        id: id,
        title: title,
        owner: owner,
        isMulti: isMulti,
        createdAt: Date.now(),
    });
    console.log('New Room created:', newRoom);
}

const getRoomList = () => {
    Room.find({}, (error, roomList) => {
        if (error) {
            console.error(error);
            return [];
        }
        else {
            return roomList;
        }
    })
}

module.exports = { createRoom, getRoomList };
const User = require('../model/User');

const createUser = (id, nickname) => {
    const newUser = {
        id: id,
        nickname: nickname,
        createdAt: Date.now(),
    };

    User.create(newUser);
    console.log('New User created:', newUser);
};

const deleteUser = (id) => {
    User.findByIdAndDelete(id);
    console.log('User deleted:', id);
};

const getUserInfo = (id) => {
    User.findOne({ id: id });
}

module.exports = { createUser, deleteUser, getUserInfo };
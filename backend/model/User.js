const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    socketId: {
        type: String,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
    },
});

export const User = mongoose.model("User", userSchema);

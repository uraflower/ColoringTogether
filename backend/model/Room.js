const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    isMulti: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        reqruied: true,
        default: Date.now,
    },
    users: {
        type: Array,
        default: []
    }
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

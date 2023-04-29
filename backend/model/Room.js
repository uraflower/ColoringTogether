const mongoose = require('mongoose');
const { Types: { ObjectId } } = mongoose.Schema;

const roomSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        // unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
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
    }
});

const Room = mongoose.model("Room", roomSchema);
module.exports = Room;

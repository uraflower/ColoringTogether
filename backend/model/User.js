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
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
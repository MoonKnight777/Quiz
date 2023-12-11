const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Quiz");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  role: {
    type: String,
    enum: ['teacher', 'student'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(plm);

const User = mongoose.model('User', userSchema);

module.exports = User;
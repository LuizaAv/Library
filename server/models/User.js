const mongoose = require("mongoose");

//here I define User Schema
const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'user'], 
    default: 'user' 
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  wave: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
}, { collection: 'registers' }); // Explicitly specify the collection name

const User = mongoose.model("User", userSchema);

module.exports = User;
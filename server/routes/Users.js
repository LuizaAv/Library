


const mongoose = require("mongoose");


const UsersSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String
})

const UsersModel = mongoose.model("register", UsersSchema);

module.exports = UsersModel
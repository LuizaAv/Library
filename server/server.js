const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userController = require("./Controllers/userController");
const bookController = require("./Controllers/bookController");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/database");

app.use("/users", userController);
app.use("/books", bookController);

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
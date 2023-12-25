
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");

const UsersModel = require("./routes/Users");
const BooksModel = require("./routes/Books")

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/database");

app.post("/register", (req, res) => {
  UsersModel.create(req.body)
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

app.get("/books", async (req, res) => {
  try{
    const books = await BooksModel.find();
    res.json(books);
  }catch (err){
    res.status(500).json({message: err.message})
  }
})

app.listen(3001, () => {
    console.log("starting the server")
})
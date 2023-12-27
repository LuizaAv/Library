
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");

const UsersModel = require("./routes/Users");
const BooksModel = require("./routes/Books")

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/database");

app.post("/register", async (req, res) => {
  try {
    const existingUser = await UsersModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const newUser = await UsersModel.create(req.body);
    res.status(201).json(newUser);
} catch (err) {
    res.status(500).json({ message: err.message });
}
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

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
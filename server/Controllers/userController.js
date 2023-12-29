const express = require("express");
const UsersModel = require("../Schemas/Users");

const router = express.Router();

router.post("/register", async (req, res) => {
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
});

router.post("/login", async (req, res) => {
    const { email, password , loggedIn} = req.body;

    try {
      const user = await UsersModel.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      if(!loggedIn){
        if (user.password !== password) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      }
  
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
});

router.get("/userHomePage", async (req, res) => {
    try{
        const users = await UsersModel.findOne();
        res.json(users);
    }catch (err){
        res.status(500).json({message: err.message})
    }
});

module.exports = router;
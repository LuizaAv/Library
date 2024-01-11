const bcrypt = require("bcrypt");
const axios = require('axios');
const User = require("../models/User");
const { generateToken } = require("../auth.js");


const admin = ["l.avetisyan7777@gmail.com"]

exports.registerUser = async (req, res) => {
  try {

    const { name, surname, email, password, mobile, wave, gender } = req.body;

    if (!name || !surname || !email || !password || !mobile || !wave || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = 'user';

    const user = new User({
      role,
      name,
      surname,
      email,
      password: hashedPassword,
      mobile,
      wave,
      gender
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully"});
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({ message: 'Login successful', user, token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

exports.homePageUser = async (req, res) => {
  try {
    const { email } = req.user; 

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findExpiredDateUsers = async (req, res) => {
  try {
    console.log('Received Request Body:', req.body);

    const expiredUserIds = req.body.expiredUserId;

    if (Array.isArray(expiredUserIds) && expiredUserIds.length > 0) {
      // Use _id field to match against MongoDB ObjectId strings
      const users = await User.find({ _id: { $in: expiredUserIds } });

      console.log('Found Users:', users);
      res.status(200).json(users);
    } else {
      console.error('Expired user IDs not provided or not an array');
      res.status(400).json({ message: 'Invalid input' });
    }
  } catch (error) {
    console.log('Find expiredDate users: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
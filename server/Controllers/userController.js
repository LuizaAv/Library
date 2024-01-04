const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateToken } = require("../auth.js");

exports.registerUser = async (req, res) => {
  try {
    const { name, surname, email, password, mobile, wave, gender } = req.body;

    if (!name || !surname || !email || !password || !mobile || !wave || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let role = 'user'; 

    if (email === 'l.avetisyan7777@gmail.com') {
      role = 'admin'; 
    }

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

    // Generate token upon successful login
    const token = generateToken(user);

    // Send user data and token in a single response
    res.status(200).json({ message: 'Login successful', user, token });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

exports.homePageUser = async (req, res) => {
  console.log(req.user)
  try {
    const { email } = req.user; // Assuming the token payload contains the user's email

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


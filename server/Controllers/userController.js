const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    const { name, surname, email, password, mobile, wave, gender } = req.body;

    if (!name || !email || !password || !mobile || !wave || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      mobile,
      wave,
      gender,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully"});
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password} = req.body;

    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      console.log(email, password, user.password)
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log(passwordMatch)
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
}

exports.homePageUser = async(req, res) => {
  const {email} = req.query
  try{
      const user = await User.findOne({ email });
      console.log(user)
      res.json(user);
  }catch (err){
      res.status(500).json({message: err.message})
  }
}
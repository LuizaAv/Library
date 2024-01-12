require('dotenv').config()
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    surname: user.surname,
    mobile: user.mobile,
    wave: user.wave,
    gender: user.gender,
    password: user.password
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw error
  }
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    const tokenToVerify = token.split(' ')[1]; 
    const decoded = verifyToken(tokenToVerify);
    
    if (!decoded) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  
    req.user = { ...decoded };
    req.user.id = decoded.userId; 
    next();
};

module.exports = { generateToken, authenticateToken };
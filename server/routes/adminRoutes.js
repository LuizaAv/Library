const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
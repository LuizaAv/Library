const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController');

router.get('/', bookController.getAllBooks);

module.exports = router;

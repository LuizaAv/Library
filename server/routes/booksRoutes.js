const express = require('express');
const router = express.Router();
const bookController = require('../controllers/booksController');

router.get('/', bookController.getAllBooks);
router.post('/delete', bookController.deleteBook);
router.post('/add', bookController.addBook);

module.exports = router;

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: [
        {
            type: String,
            required: true
        }
    ],
    isbn: {
        type: String,
        required: true
    },
    published_year: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean
    }
}, { collection: 'books' });

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
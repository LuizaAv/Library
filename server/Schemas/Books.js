const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
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
    }
})

const BooksModel = mongoose.model("book", BookSchema);

module.exports = BooksModel;
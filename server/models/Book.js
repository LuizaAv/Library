const mongoose = require("mongoose");

//here I define Book Schema
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    authors: [
      {
        type: String,
        required: true,
      },
    ],
    isbn: {
      type: String,
      required: true,
    },
    published_year: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
      },
    ],
    availability: {
      type: Boolean,
    },
    location: {
      shelf: String,
      row: Number,
    },
    additional_info: {
      publisher: String,
      language: String,
      page_count: Number,
    },
  },
  { collection: "books" }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

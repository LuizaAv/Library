const Book = require('../models/Book');




exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { isbn } = req.body;

  try {
    const deletedBook = await Book.findOneAndDelete({ isbn });
    if (deletedBook) {
      res.status(200).json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.addBook = async (req, res) => {
  console.log('hi');
  const {
    title,
    authors,
    isbn,
    published_year,
    category,
    availability,
    location,
    additional_info
  } = req.body;
 
  console.log(req.body.title)
  try {
    const newBook = new Book({
      title,
      authors: authors.split(','), 
      isbn,
      published_year,
      category: category.split(','), 
      availability,
      location,
      additional_info
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook); 
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Could not add book" });
  }
};


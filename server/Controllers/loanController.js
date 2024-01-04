const Book = require('../models/Book');
const Loan = require('../models/Loan');
;

exports.createLoan = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    // Check book availability
    const book = await Book.findOne({ isbn: bookId });
    
    if (!book || !book.availability) {
      console.log(book.availability)
      return res.status(400).json({ message: 'Book not available for loan' });
    }

    const currentDate = new Date();
    const oneMonthLater = new Date(currentDate);
    oneMonthLater.setMonth(currentDate.getMonth() + 1);

    const newLoan = new Loan({
      user: userId,
      book: bookId,
      borrowed_date: currentDate,
      return_date: oneMonthLater
    });

    console.log('Attempting to save newLoan:', newLoan);
    await newLoan.save();
    return res.status(201).json({ message: 'Book successfully borrowed' });
    
  } catch (error) {

    console.error('Error creating loan:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
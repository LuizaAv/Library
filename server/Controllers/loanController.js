const Book = require('../models/Book');
const Loan = require('../models/Loan');
;

exports.createLoan = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const book = await Book.findOne({ isbn: bookId });
    
    if (!book || !book.availability) {
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

    await newLoan.save();
    return res.status(201).json({ message: 'Book successfully borrowed' });
    
  } catch (error) {

    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getUserLoans = async (req, res) => {
  try {
    const userId = req.query.userId; 

    const userLoans = await Loan.find({ user: userId });

    return res.status(200).json(userLoans);
  } catch (error) {
    console.error('Error fetching user loans:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
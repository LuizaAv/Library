const mongoose = require("mongoose");

//here I define Loan Schema
const loanSchema = new mongoose.Schema({
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  book: {
    type: String,
    ref: "Book",
    required: true,
  },
  borrowed_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  return_date: {
    type: Date,
  },
}, { collection: 'loans' });

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
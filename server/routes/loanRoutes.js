const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../auth.js");
const loanController = require("../controllers/loanController");

router.post('/', authenticateToken, loanController.createLoan);
router.get('/', authenticateToken, loanController.getUserLoans);
router.get('/expiredLoans', authenticateToken, loanController.expiredLoans);

module.exports = router;
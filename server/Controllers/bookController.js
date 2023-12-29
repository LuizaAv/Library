const express = require("express");
const BooksModel = require("../Schemas/Books");

const router = express.Router();

router.get("/books", async (req, res) => {
    try{
        const books = await BooksModel.find();
        res.json(books);
    }catch (err){
        res.status(500).json({message: err.message})
    }
});

module.exports = router;
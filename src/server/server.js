


const express = require('express');
const app = express();

const booksRoute = require("./routes/Books.js");
const loansRoute = require("./routes/Loans.js");
const usersRoute = require("./routes/Users.js");

app.use("/books", booksRoute);
app.use("/loans", loansRoute);
app.use("/users", usersRoute);

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

const port = process.env.PORT || 5000; 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
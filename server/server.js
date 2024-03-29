const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require('./routes/booksRoutes');
const loanRoutes = require("./routes/loanRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(cors());
app.use(express.json());

//conection to mongoose
mongoose.connect("mongodb://127.0.0.1:27017/database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use('/loans', loanRoutes);
app.use('/admins', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
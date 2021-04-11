require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Setting up express server.
const app = express();

// Setting database connection.
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Logs
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to database"));

// Middleware config
app.use(express.json());
const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

app.listen(3000, () => console.log("Server is running"));

module.exports = app;

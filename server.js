// require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const booksRouter = require("./routes/books");

// Setting up express server.
const app = express();

// Setting database connection.
// TODO: Change URL to mongodb://mongo:27018/books for docker.
mongoose.connect("mongodb://localhost/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Logs
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to database"));

// Middleware config
app.use(express.json());
app.use("/books", booksRouter);

app.listen(3000, () => console.log("Server is running"));

module.exports = app;

const express = require("express");
const router = express.Router();
const Book = require("../model/book");

// - (C)reate a new Book
// - (R)ead existing Books
// - (U)pdate an existing Book
// - (D)elete an existing Book

// Getting books.
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one book.
router.get("/:id", getBook, (req, res) => {
  res.send(res.book);
});

// Create a book.
router.post("/", async (req, res) => {
  const book = new Book({
    _id: req.body.isbn,
    author: req.body.author,
    title: req.body.title,
    isbn: req.body.isbn,
    releaseDate: req.body.releaseDate,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book.
router.patch("/:id", getBook, async (req, res) => {
  const { title, author, releaseDate } = req.body;
  if (title != null) {
    res.book.title = title;
  }
  if (author != null) {
    res.book.author = author;
  }
  if (releaseDate != null) {
    res.book.releaseDate = releaseDate;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book.
router.delete("/:id", getBook, async (req, res) => {
  try {
    await res.book.remove();
    res.json({ message: "Book deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware: For getting a book from specific id.
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book === null) {
      return res.status(404).json({ message: "Book not found." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.book = book;
  next();
}

module.exports = router;

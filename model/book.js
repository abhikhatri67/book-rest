const mongoose = require("mongoose");
const { Schema } = mongoose;

// - Author (mandatory)
// - Title (mandatory)
// - ISBN (mandatory)
// - Release Date

const bookSchema = new Schema({
  _id: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isbn: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Book", bookSchema);

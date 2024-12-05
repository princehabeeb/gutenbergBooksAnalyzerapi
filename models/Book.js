const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  content: String,
  metadata: Object,
});

module.exports = mongoose.model("Book", BookSchema);

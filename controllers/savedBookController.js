const MyBook = require("../models/SavedBook");

// Save book for a user
exports.saveBook = async (req, res) => {
  try {
    const { title, metadata, content } = req.body;
    const userId = req.user.id;

    const newBook = new MyBook({ user: userId, title, metadata, content });
    await newBook.save();

    res.status(201).json({ message: "Book saved successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Retrieve all books for a user
exports.getUserBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const books = await MyBook.find({ user: userId });

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

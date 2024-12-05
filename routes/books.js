const express = require("express");
const axios = require("axios");
const Book = require("../models/Book");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`https://www.gutenberg.org/cache/epub/${id}/pg${id}.txt`);
    const metadata = { title: `Book ${id}` }; // Placeholder metadata
    const newBook = new Book({ title: `Book ${id}`, content: response.data, metadata });

    await newBook.save();
    res.json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book data" });
  }
});

module.exports = router;

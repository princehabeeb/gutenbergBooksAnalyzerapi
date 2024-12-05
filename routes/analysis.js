const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;
  // Example: Simple analysis (length of text)
  const analysis = {
    characterCount: text.length,
  };
  res.json(analysis);
});

module.exports = router;

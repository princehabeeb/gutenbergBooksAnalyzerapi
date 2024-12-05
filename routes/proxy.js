const express = require("express");
const axios = require("axios");
const Book = require("../models/Book");

const router = express.Router();

router.get("/proxy", async (req, res) => {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }
  
    try {
      const response = await axios.get(url);
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch resource" });
    }
});

module.exports = router;

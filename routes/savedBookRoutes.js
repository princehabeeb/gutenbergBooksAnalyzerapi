const express = require("express");
const { saveBook, getUserBooks } = require("../controllers/savedBookController");
const validateRequest = require("../middlewares/validateRequest");
const auth = require("../middlewares/auth");
const Joi = require("joi");

const router = express.Router();

// Validation schemas
const saveBookSchema = Joi.object({
  title: Joi.string().required(),
  metadata: Joi.string().required(),
  content: Joi.string().required(),
});

// Save book
router.post("/", auth, validateRequest(saveBookSchema), saveBook);

// Get user books
router.get("/", auth, getUserBooks);

module.exports = router;

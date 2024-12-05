require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/books");
const analysisRoutes = require("./routes/analysis");
const proxyRoutes = require("./routes/proxy");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/fetch-book", bookRoutes);
app.use("/api/analyze", analysisRoutes);
app.use("/api/proxy", proxyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

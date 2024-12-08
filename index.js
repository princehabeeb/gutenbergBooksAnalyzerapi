require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



const app = express();
app.use(express.json());

// managing cors
const corsOptions = {
    origin: ['https://www.snappose.com', 'http://localhost:3000'],
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
   // Handle preflight requests
   app.options('*', cors());

const bookRoutes = require("./routes/books");
const analysisRoutes = require("./routes/analysis");
const proxyRoutes = require("./routes/proxy");
const authRoutes = require("./routes/authRoutes");






// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/fetch-book", bookRoutes);
app.use("/api/analyze", analysisRoutes);
app.use("/api/proxy", proxyRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

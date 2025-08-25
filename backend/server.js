const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routing
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the MERN Blog API!" });
});

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

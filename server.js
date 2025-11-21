const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // in production set origin to your frontend domain
app.use(express.json());

// mount routers
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

app.get("/", (req, res) => res.send("Book Library API is running"));

// connect to mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
});

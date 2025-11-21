const express = require("express");
const route = express.Router();
const Book = require("../models/Book");
const verifyToken = require("../middleware/auth");

// GET /api/books  (returns books for logged-in user)
route.get("/", verifyToken, async (req, res) => {
  try {
    const books = await Book.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/books
route.post("/", verifyToken, async (req, res) => {
  try {
    const { title, author, status } = req.body;
    if (!title || !author) return res.status(400).json({ message: "Title and author required" });

    const newBook = new Book({ title, author, status: status || "Plan to Read", owner: req.userId });
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/books/:id
route.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, status } = req.body;
    const book = await Book.findOneAndUpdate(
      { _id: id, owner: req.userId },
      { title, author, status },
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: "Book not found or unauthorized" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/books/:id
route.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findOneAndDelete({ _id: id, owner: req.userId });
    if (!book) return res.status(404).json({ message: "Book not found or unauthorized" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = route;

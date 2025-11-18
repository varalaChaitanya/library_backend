const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Plan to Read", "Reading", "Completed"],
      default: "Plan to Read",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);

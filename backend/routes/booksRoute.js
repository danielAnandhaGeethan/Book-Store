const express = require("express");
const Book = require("../models/bookModel");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json(books);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.find({ id: id });

    if (!book || !book.length) {
      return res.status(404).send({
        message: "Book not found",
      });
    }

    return res.status(200).json(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Invalid Data" });
    }

    const books = await Book.find();
    const id = books.length
      ? books[books.length - 1].id
        ? books[books.length - 1].id + 1
        : 1
      : 1;

    const newBook = {
      id: id,
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).json(book);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title && !req.body.author && !req.body.publishYear) {
      return res.status(400).send({
        message: "No Data",
      });
    }

    const { id } = req.params;

    const value = await Book.find({ id: id });

    if (!value.length)
      return res.status(404).send({
        message: "Book not found",
      });

    const result = await Book.findByIdAndUpdate(value[0]._id, req.body);

    return res.status(200).send("Data updated successfully");
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const value = await Book.find({ id: id });

    if (!value.length)
      return res.status(404).send({
        message: "Book not found",
      });

    const result = await Book.findByIdAndDelete(value[0]._id);

    return res.status(200).send({
      message: "Data deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = router;

import express from "express";
import book from "../Book.js";

let router = express.Router();
// let len = book.length;
router.post("/", (req, res) => {
  let nbook = {
    id: book.len + 1,
    title: req.body.title,
    genre: req.body.genre,
    year: req.body.year,
    author: req.body.author,
    available: req.body.available,
  };

  book.push(nbook);
  res.status(201).json(nbook);
});

export default router;

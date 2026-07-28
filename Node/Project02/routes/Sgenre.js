import express from "express";
import book from "../Book.js";

let router = express.Router();

router.get("/", (req, res) => {
  let gen = req.query.genre;

  let found = book.filter((i) => i.genre === gen);

  if (!found) {
    return res.status(404).json({ err: "This book is not found" });
  }

  res.json({
    found,
  });
});

export default router;

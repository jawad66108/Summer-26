import express from "express";
import book from "../Book.js";

let router = express.Router();

router.get("/", (req, res) => {
  res.json({
    book,
  });
});

export default router;

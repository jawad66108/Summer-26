import express from "express";
import book from "../Book.js";

let router = express.Router();

router.get("/:id", (req, res) => {
  let nid = Number(req.params.id);

  let Fbook = book.find((i) => i.id === nid);

  if (!Fbook) {
    return res.status(404).json({ err: "Not found!" });
  }

  res.json({
    Fbook,
  });
});

export default router;

import express from "express";
import book from "../Book.js";

let router = express.Router();

router.delete("/:id", (req, res) => {
  let nid = Number(req.params.id);

  let ind = book.findIndex((i) => i.id === nid);

  if (ind === -1) {
    return res.status(400).json({ err: "Not found" });
  }

  let del = book.splice(ind, 1);
  res.json({
    meg: "Book details deleted!!!",
  });
});

export default router;

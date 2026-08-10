import express from "express";
import notes from "../notes.js";

const router = express.Router();

router.put("/:id", (req, res) => {
  let id = Number(req.params.id);
  let note = notes.find((n) => n.id === id);

  if (!note) {
    return res.status(404).json({ error: "Note not found" });
  }

  note.title = req.body.title;
  note.content = req.body.content;
  res.json(note);
});

export default router;

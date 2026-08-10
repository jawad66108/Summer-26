// app.get("/api/notes/:id", (req,res) => {
//     res.json({

//         ID: req.params.id,
//         Title,content
//     })
// })

import express from "express";
import notes from "../notes.js";

let router = express.Router();

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  let note = notes.find((i) => i.id === id);

  if (!note) {
    return res.statusCode(400).json({ error: "ID not found" });
  }
  res.json(note);
});

export default router;

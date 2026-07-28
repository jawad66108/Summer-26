// app.post("/api/notes/:id/:title/:content", (req, res) => {
//   res.json({
//     message: "Note Created",
//     id: req.params.id,
//     Title: req.params.title,
//     content: req.params.content,
//   });
// });

import express from "express";
import notes from "../notes.js";

let router = express.Router();

router.post("/", (req, res) => {
  let newnode = {
    id: notes.length + 1,
    title: req.body.title,
    content: req.body.content,
  };

  notes.push(newnode);
  res.status(201).json(newnode);
});

export default router;

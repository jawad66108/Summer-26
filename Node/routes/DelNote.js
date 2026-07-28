// app.delete("/api/notes/:id" , (req,res) => {
//     res.json({
//         id:req.params.id,
//         Title,content,
//         message:" This data has been deleted"
//     })
// })

import express from "express";
import notes from "../notes.js";

let router = express.Router();

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);

  let i = notes.findIndex((n) => n.id === id);

  if (i === -1) {
    return res.status(404).json({ err: "Not found!!" });
  }

  let del = notes.splice(i, 1);
  res.json({ meg: "note deleted" });
});

export default router;

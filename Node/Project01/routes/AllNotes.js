// app.get("/api/notes" , (req,res) => {
//     res.json({
//         message :"All Notes are as Follow:\n",
//         ID,
//         Title,
//         Content
//     })
// })

import express from "express";
import notes from "../notes.js";

let router = express.Router();

router.get("/", (req, res) => {
  res.json(notes);
});

export default router;

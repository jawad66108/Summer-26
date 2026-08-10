import express from "express";
import book from "../Book.js";

let router = express.Router();

router.put("/:id", (req, res) => {
  id: req.params.id;
});

export default router;

import express from "express";
import { authenticate } from "../middleware/authenticate";
import { requireAdmin } from "../middleware/requireAdmin";
import db from "../DB/connection.js";

let router = express.Router();

router.get("/lost-damaged", requireAdmin, authenticate, (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ er: errr.message });
  }
});

export default router;

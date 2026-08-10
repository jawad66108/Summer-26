import express from "express";

import exp from "../expenses.js";
let router = express.Router();

router.get("/total", (req, res) => {
  exp.reduce((sum, i) => sum + i.amount, 0);
  res.json({
    result: sum,
  });
});

export default router;

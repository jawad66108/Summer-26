import express from "express";

import exp from "../expenses.js";

let router = express.Router();

router.put("/:id", (req, res) => {
  let nid = Number(req.params.id);
  let newn = exp.find((i) => i.id === nid);

  if (!newn) {
    return res.status(404).json({ err: " not found" });
  }

  newn.description = req.body.description;
  newn.date = req.body.date;
  newn.amount = req.body.amount;
  newn.category = req.body.category;

  res.json(newn);
});

export default router;

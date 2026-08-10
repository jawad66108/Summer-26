import express from "express";
import exp from "../expenses.js";

let router = express.Router();

router.post("/", (req, res) => {
  let newE = {
    id: exp.length + 1,
    discription: req.body.discription,
    date: req.body.date,
    amount: req.body.amount,
    category: req.body.category,
  };
  exp.push(newE);

  res.json({
    meg: "Successfully created new expense",
  });
});

export default router;

import express from "express";

import exp from "./expenses.js";

router.get("/total", (req, res) => {
  exp.reduce((i, sum) => (sum += i.amount));
  res.json({
    result: sum,
  });
});

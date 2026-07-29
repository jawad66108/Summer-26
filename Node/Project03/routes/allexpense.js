import express from "express";
import exp from "../expenses.js";

let router = express.Router();

router.get("/", (req, res) => {
  res.json({
    exp,
  });
});

router.get("/:category", (req, res) => {
  let fonud = exp.find((i) => req.params.category === i.category);

  if (found) {
    return res.json({
      details: req.params.category,
    });
  } else {
    return res.status(404).json({ err: "Not Found" });
  }
});

export default router;

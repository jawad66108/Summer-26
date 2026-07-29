import express from "express";
import exp from "../expenses.js";

let router = express.Router();

router.delete("/:id", (req, res) => {
  let nid = Number(req.params.id);
  let index = exp.findIndex((i) => i.id === nid);

  if (index === -1) {
    return res.status(404).json({ err: "Not found" });
  }

  let deleted = exp.splice(index, 1);
  res.json({ message: "Expense deleted successfully", deleted: deleted[0] });
});

export default router;

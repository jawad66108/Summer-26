import express from "express";
import Order from "../models/orders.js";

let router = express.Router();

router.delete("/:id", async (req, res) => {
  let ID = req.params.id;

  try {
    let data = await Order.deleteOne({
      _id: ID,
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

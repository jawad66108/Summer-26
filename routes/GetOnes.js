import express, { Router } from "express";
import Product from "../../models/Products.js";
import Order from "../../models/orders.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/order", async (req, res) => {
  try {
    let orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

export default router;

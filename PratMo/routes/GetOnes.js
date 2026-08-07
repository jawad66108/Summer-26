import express from "express";
import Product from "../models/Products.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

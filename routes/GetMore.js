import express from "express";
import Product from "../../models/Products.js";

let router = express.Router();

router.get("/", (req, res) => {
  try {
    let { name, brand, category, price, stock, rating, discount, tags } =
      req.body;
    let data = Product.create({
      name,
      brand,
      category,
      price,
      stock,
      rating,
      discount,
      tags,
    });
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;

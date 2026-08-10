import express from "express";
import Product from "../../models/Products.js";

let router = express.Router();

router.put("/:id", async (req, res) => {
  let ID = req.params.id;

  try {
    let product = await Product.findByIdAndUpdate(
      ID,
      {
        $set: {
          price: 150000,
        },
      },
      { new: true },
    );

    res.json(product);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

export default router;

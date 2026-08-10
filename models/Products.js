import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: String,
  name: String,
  brand: String,
  category: String,
  price: Number,
  stock: Number,
  rating: Number,
  discount: Number,
  tags: [String],
});

const Product = mongoose.model("Product", productSchema, "products");
export default Product;

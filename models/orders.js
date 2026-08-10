import mongoose from "mongoose";

let OrderSchema = new mongoose.Schema({
  orderId: String,
  customer: String,
  products: [String],
  paymentMethod: String,
  status: String,
  total: Number,
});

let Order = mongoose.model("Order", OrderSchema);

export default Order;

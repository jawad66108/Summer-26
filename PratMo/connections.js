import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerce");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
  }
}

export default connectDB;

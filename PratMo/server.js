import express from "express";
import connectDB from "./connections.js";
import productsRouter from "./routes/GetOnes.js";

connectDB();

let app = express();
app.use(express.json());

app.use("/api/products", productsRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

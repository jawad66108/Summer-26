import express from "express";
import connectDB from "./connections.js";
import productsRouter from "./routes/GetOnes.js";
import createP from "./routes/GetMore.js";
import update from "./routes/puting.js";

connectDB();

let app = express();
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/products/Creat", createP);
app.use("/api/putting", update);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

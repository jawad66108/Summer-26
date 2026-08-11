import express from "express";
import connectDB from "./connections.js";
import productsRouter from "./routes/GetOnes.js";
import createP from "./routes/GetMore.js";
import update from "./routes/puting.js";
import del from "./routes/del.js";
import auth from "./routes/auth.js";

connectDB();

let app = express();
app.use(express.json());

app.use("/api", auth);
app.use("/api/products", productsRouter);
app.use("/api/products/Creat", createP);
app.use("/api/putting", update);
app.use("/api/deleting", del);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

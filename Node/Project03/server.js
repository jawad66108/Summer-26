import express from "express";
import totalexpense from "./routes/sumexp.js";
import deleteexp from "./routes/Delexp.js";
import createexp from "./routes/Cexp.js";
import allD from "./routes/allexpense.js";
import updateexp from "./routes/Upexp.js";

let app = express();
app.use(express.json());

app.use("/api/expenses", allD); // all + category filter
app.use("/api/expenses", totalexpense); // MUST come before any route with :id inside it
app.use("/api/expenses", createexp);
app.use("/api/expenses", updateexp);
app.use("/api/expenses", deleteexp);

app.listen(3000, () => {
  console.log("Server is running successfully!!");
});

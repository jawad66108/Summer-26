import express from "express";
import db from "./DB/connection.js";
import dotenv from "dotenv";
import auth from "./Auth/login.js";
import items from "./routes/items.js";
import damaged from "./routes/damagedRecords.js";
import lost from "./routes/lostRecords.js;";

dotenv.config();

let app = express();
app.use(express.json());

app.use("/api", auth);
app.use("/api", items);
app.use("/api", damaged);
app.use("/api", lost);

app.listen(process.env.PORT, () => {
  console.log(`Server is running successfully runing`);
});

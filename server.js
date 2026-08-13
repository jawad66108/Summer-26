import express from "express";
import login from "./routes/login.js";
import db from "./DB/connection.js";
import test from "./routes/test.js";

db();

let app = express();
app.use(express.json());

app.use("/api", auth);
app.use("/api", test);
app.use("/api", login);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

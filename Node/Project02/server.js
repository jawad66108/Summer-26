import express from "express";
let app = express();

app.use(express.json());

import allBok from "./routes/allbooks.js";
import CreatBoo from "./routes/Cbbok.js";
import Update from "./routes/Upbook.js";
import Delbok from "./routes/Delbook.js";
// import SpeficB from "../Project02/routes/Sgenre.js";
import onebook from "./routes/Onebook.js";

app.use("/api/Book", allBok);
app.use("/api/Book", CreatBoo);
app.use("/api/Book", Delbok);
// app.use("/api/Book", SpeficB);
app.use("/api/Book", onebook);
app.use("/api/Book", Update);

app.listen(3000, () => {
  console.log("Server is running Perfectly!!");
});

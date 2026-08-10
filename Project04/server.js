import express from "express";
import com from "./routers/companies.js";
import apl from "./routers/application.js";
import intr from "./routers/interview.js";

let app = express();
app.use(express.json());

app.use("/api/companies", com);
app.use("/api/applications", apl);
app.use("/api/interview", intr);

app.listen(3000, () => {
  console.log(`Your Backend is working 100%`);
});

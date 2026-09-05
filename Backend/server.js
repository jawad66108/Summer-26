import express from "express";
import cors from "cors";
import db from "./DB/connection.js";
import dotenv from "dotenv";
import auth from "./Auth/login.js";
import items from "./routes/items.js";
import lostRecordsRoutes from "./routes/lostRecords.js";
import damagedRecordsRoutes from "./routes/damagedRecords.js";
import reportsRoutes from "./routes/reports.js";
import dashboardRoutes from "./routes/dashboard.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

let app = express();
app.use(cors());
app.use(express.json());

app.use("/api", auth);
app.use("/api", items);
app.use("/api/lost-records", lostRecordsRoutes);
app.use("/api/damaged-records", damagedRecordsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/uploads", express.static("uploads"));

app.use(errorHandler); // registered once, last

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

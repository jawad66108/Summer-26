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
app.use(
  cors({
    origin: [
      "https://sportskit.vercel.app", // your actual live frontend domain
      "https://summer-26-tve2.vercel.app", // keep in case still used
      "https://kitledger-frontend.vercel.app", // keep in case you add this domain later
      "http://localhost:5173", // local dev
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api", auth);
app.use("/api", items);
app.use("/api/lost-records", lostRecordsRoutes);
app.use("/api/damaged-records", damagedRecordsRoutes);
app.use("/api/reports", reportsRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(errorHandler); // registered once, last

export default app;

if (process.env.NODE_ENV !== "production") {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}

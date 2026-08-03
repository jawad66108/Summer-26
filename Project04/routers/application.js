import express from "express";
import db from "../connection.js";

let router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = await db.query(`SELECT 
        applications.id,
        applications.role,
        applications.status,
        applications.applied_date,
        companies.name AS company_name
      FROM applications
      JOIN companies ON applications.company_id = companies.id`);

    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put("/:id", async (req, res) => {
  let ID = Number(req.params.id);
  let Status = req.body.status;

  try {
    let data = await db.query(
      "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *",
      [Status, ID],
    );

    // if (data.rows.length === 0) {
    //   return res.status(404).json({ error: "Application not found" });
    // }

    res.json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

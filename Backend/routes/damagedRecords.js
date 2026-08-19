import { authenticate } from "../middleware/authenticate";
import { requireAdmin } from "../middleware/requireAdmin";
import db from "../DB/connection.js";
import express from "express";

let router = express.Router();

router.post("/", authenticate, requireAdmin, async (req, res) => {
  try {
    let data = await db.query(`select * from damaged_records `);

    if (data.rows.length === 0) {
      return res.status(404).json("No record present");
    }

    res.json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ er: err.message });
  }
});

router.patch("/:id/replace", authenticate, requireAdmin, async (req, res) => {
  try {
    let ID = req.params.id;
    let data = await db.query(
      `update status =Replace from damaged_records where id = $1`,
      [ID],
    );

    if (data.rows.length === 0) {
      return res.status(404).json("Invalid ID\nTry Again");
    }

    if (data.rows.length > 0) {
      res.json("Status updated successfully", data.rows[0]);

      await db.query(
        `update total_quantity = total_quantity+1 from items where id = $1`,
        [ID],
      );
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

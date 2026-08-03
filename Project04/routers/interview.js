import express from "express";
import db from "../connection.js";

let router = express.Router();

router.get("/:id/rounds", async (req, res) => {
  let ID = Number(req.params.id);
  try {
    let data = await db.query(
      `SELECT * FROM interview_rounds WHERE application_id = $1`,
      [ID],
    );
    res.json(data.rows[0]);
  } catch (errr) {
    res.status(500).json({ errr: errr.message });
  }
});

export default router;

import express from "express";
import pool from "./connection.js";

let router = express.Router();

router.post("/", async (req, res) => {
  const { id, name, age, email } = req.body;

  try {
    if (!id || !name || !age || !email) {
      return res.status(400).json({
        err: "You must provide all information",
      });
    }

    const data = await pool.query(
      "INSERT INTO students (id,name, age, email) VALUES ($1, $2, $3,$4) RETURNING *",
      [id, name, age, email],
    );

    return res.status(201).json(data.rows[0]); // or data.rows
  } catch (err) {
    return res.status(500).json({
      err: err.message,
    });
  }
});

export default router;

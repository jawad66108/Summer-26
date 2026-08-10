import express from "express";
import db from "../connection.js";

let router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = await db.query(`SELECT * FROM companies`);
    res.json(data.rows);
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  let { name, industry } = req.body;

  try {
    let data = await db.query(
      `INSERT INTO companies (name, industry) VALUES ($1, $2) RETURNING *`,
      [name, industry],
    );
    res.json(data.rows[0], "Data successfully added");
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err);
  }
});

export default router;

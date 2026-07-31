import express from "express";
import pool from "./connection.js";

let router = express.Router();

router.post("/one", async (req, res) => {
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

router.post("/", async (req, res) => {
  let { id, name, email, age } = req.body;

  try {
    let status = "active";

    let data = await pool.query(
      `insert  into students (id,name,age,email,status) values ($1,$2,$3,$4,$5) returning *`,
      [id, name, age, email, status],
    );
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ err: "Interal server error" });
  }
});

router.post("/:id/enroll-course", async (req, res) => {
  let id = req.params.id;
  let coursename = req.body.coursename;
  try {
    let data = await pool.query(`SELECT FROM students WHERE id = $1`, [id]);
    if (data.rows.length === 0) {
      return res.status(404).json(`Not found`);
    }

    console.log(`Enrolled ${coursename} for student with id: ${id}`);
    res.json({ message: `Enrolled ${coursename} for student with id: ${id}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Interval server error" });
  }
});

export default router;

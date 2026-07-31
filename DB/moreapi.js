import express from "express";
import db from "./connection.js";

let router = express.Router();

router.put("/:id", async (req, res) => {
  let id = Number(req.params.id);
  let { name, age, email } = req.body;

  try {
    let ress = await db.query(
      "UPDATE students SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *",
      [name, age, email, id],
    );

    if (ress.rows.length === 0) {
      return res.status(404).json({ error: "Student not found!!" });
    }

    res.json(ress.rows[0]);
  } catch (err) {
    res.status(500).json({ err: "Error in the server" });
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  let id = Number(req.params.id);
  try {
    let ress = await db.query(`delete from students where id=$1 returning *`, [
      id,
    ]);
    if (ress.rows.length === 0)
      return res.status(404).json(`No student present with id ${id}`);

    res.json(`Data deleted successfully!`);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;

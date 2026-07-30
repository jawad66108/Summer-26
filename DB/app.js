import express from "express";
import pool from "./connection.js";

let app = express();

app.get("/api/std", async (req, res) => {
  console.log("all students ");
  try {
    let data = await pool.query("select*from students");
    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

app.get("/api/std/:id", async (req, res) => {
  try {
    let nid = Number(req.params.id);
    let data = await pool.query("select * from students where id = $1 ", [nid]);
    res.json(data.rows[0]);
  } catch (err) {
    res.status(500).json({ err: "Not Found!!!" });
  }
});

app.get("/api/std", async (req, res) => {
  try {
    console.log("filtered students");
    let agge = Number(req.query.age);

    let data = await pool.query("select name from students where age>=$1", [
      agge,
    ]);

    if (data.rows.length === 0)
      return res.json({ msg: `No student present under this ${agge}` });

    res.json(data.rows);
  } catch (err) {
    res.status(500).json({ err: "internal Server Error" });
  }
});

app.get("/api/std/sort/:orderby", async (req, res) => {
  let oorderby = req.params.orderby;

  let data = await pool.query(`select * from students order by ${oorderby}`);

  res.json(data.rows);
});

app.get("/api/std/search", async (req, res) => {
  try {
    let age = req.query.age;
    let name = req.query.name;

    // let col = ["age", "name"];

    // if (!{ age, name }.include(col))
    //   return res
    //     .status(404)
    //     .json({ err: "Not found the col you are looking for" });

    if (agge && naame) {
      let data = await pool.query(`select name,age from students`);
      res.json(data.rows);
    } else if (!agge && naame) {
      let data = await pool.query(`select name from students`);
      res.json(data.rows);
    } else {
      let data = await pool.query(`select age from students`);
      res.json(data.rows);
    }
  } catch (err) {
    res.status(500).json({ err: `Unknow error in Backend` });
  }
});

app.listen(3000, () => {
  console.log("Server runing successfully!!");
});

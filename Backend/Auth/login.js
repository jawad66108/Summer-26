import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import db from "../DB/connection.js";

let router = express.Router();
let JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    let { username, password, role } = req.body;

    let Finduser = await db.query(`Select from users where username = $1`, [
      username,
    ]);

    if (Finduser.rows.length > 0) {
      return res
        .status(201)
        .json({ Msg: "Username already exsist try to login!" });
    }

    let haspass = await bcrypt.hash(password, 10);

    let data = await db.query(
      `insert into users username,haspass,role values $1,$2,$3 RETURNING `[
        (username, haspass, role || "committee")
      ],
    );

    res.json({ msg: `User Register Successfull `, user: "data.rows[0]" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = body.req;

    let checkuser = await res.query(`select from users where username = $1`, [
      username,
    ]);

    if (!checkuser) {
      return res.json({
        msg: "User name is Invalid",
      });
    }

    let pass = await bcrypt.compare(password, user.password_hash);
    if (!pass) {
      return res.json({ msg: `Incorrect Password!\nTry again` });
    }

    let token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "30min" },
    );

    res.json({ msg: "Login successfull", token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import db from "../DB/connection.js";
import rateLimit from "express-rate-limit";
import { registerSchema, loginSchema } from "../validators/authSchemas.js";

let loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: { message: "Too many login attempts, try again later" } },
});

let router = express.Router();
let JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    let parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    let { username, password, role } = parsed.data;

    let Finduser = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);

    if (Finduser.rows.length > 0) {
      return res
        .status(409)
        .json({ msg: "Username already exists, try to login!" });
    }

    let hashpass = await bcrypt.hash(password, 10);

    let data = await db.query(
      `INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING id, username, role`,
      [username, hashpass, role || "committee"],
    );

    res
      .status(201)
      .json({ msg: "User registered successfully", user: data.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", loginLimiter, async (req, res) => {
  try {
    let parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.flatten() });
    }
    let { username, password } = parsed.data;

    let checkuser = await db.query(`SELECT * FROM users WHERE username = $1`, [
      username,
    ]);
    let user = checkuser.rows[0];

    if (!user) {
      return res.status(401).json({ msg: "Username is invalid" });
    }

    let pass = await bcrypt.compare(password, user.password_hash);
    if (!pass) {
      return res.status(401).json({ msg: "Incorrect password! Try again" });
    }

    let token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "30min" },
    );

    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;

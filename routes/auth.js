import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

let router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let { username, password } = req.body;
    let hashP = await bcrypt.hash(password, 10);

    let newUser = await User.create({ username, password: hashP });
    res.status(201).json({ meg: "User resgister", username: newUser.username });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Username already taken" });
    }
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let { username, password } = req.body;

    let user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ err: "Invalid user name or password" });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ err: "Invalid username or password" });
    }

    let token = jwt.sign(
      { userid: user._id, username: user.username, role: user.role },
      "Thisissercet",
      { expiresIn: "30min" },
    );
    res.json({ meg: "Login successfull", token });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

export default router;

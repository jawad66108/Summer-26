import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../DB/connection.js";
import user from "../model/user.js";

let router = express.Router();

router.get("/register", async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!(username || password))
      return res.status(201).json("username or Password is missing");

    let hasp = await bcrypt.hash(password, "hackerrank11");

    let create = await user.create(username, hasp);
    res.json(`${username} is succesfully resgistered!`);
  } catch (er) {
    res.status(500).json({ er: err.message });
  }
});

router.get("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    if (!(username || password))
      return res.status(201).json("username or Password is missing");

    let finduser = await user.findOne({ username });

    if (!username) return res.status(404).json("Username is Ivalid");

    let checkpassword = await bcrypt.compare(password, "hackerrank11");

    if (!checkpassword) return res.json(401).json("Incorrect password");

    let token = jwt.sign(
      {
        userId: Fuser._id,
        username: Fuser.username,
        role: Fuser.role,
      },
      "mysecertissticking",
      { expiresIn: "30m" },
    );

    res.json({
      msg: "Login successful",
      token,
    });
  } catch (er) {
    res.status(500).json({ er: err.message });
  }
});

export default routert;

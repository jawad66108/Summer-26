import express from "express";
import bcrypt from "bcrypt";
import users from "../users.js";

const router = express.Router();

router.post("/", async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  let existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already taken" });
  }

  let hashedPassword = await bcrypt.hash(password, 10);

  let newUser = {
    id: users.length + 1,
    username: username,
    password: hashedPassword,
  };

  users.push(newUser);
  res
    .status(201)
    .json({ message: "User registered", username: newUser.username });
});

export default router;

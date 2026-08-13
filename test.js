import express from "express";
import authenticate from "../middleware/auth.js";

let router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json({
    message: "you are authenticate",
    user: req.user,
  });
});

export default router;

import rateLimit from "express-rate-limit";

let loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: { message: "Too many login attempts, try again later" } },
});

import jwt from "jsonwebtoken";

let JWT_SECRET = process.env.JWT_SECRET;

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  let token = authHeader.split(" ")[1];

  try {
    let decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Internal server error!" });
  }
}

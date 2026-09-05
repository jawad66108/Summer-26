export function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ error: { message: err.message || "Internal server error" } });
}

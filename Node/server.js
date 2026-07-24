import express from "express";

const app = express();

app.get("/greet/:name", (req, res) => {
  console.log(req.params);

  res.send(`i hope it is going well ${req.params.name}`);
});

app.get("/search", (req, res) => {
  console.log(req.query);
  res.send(`You searched for: ${req.query.term}`);
});

app.get("/api/user/:id", (req, res) => {
  res.json({
    id: req.params.id,
    name: "Testing users",
    status: "active",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// import express from "express";

// const app = express();

// app.get("/greet/:name", (req, res) => {
//   console.log(req.params);

//   res.send(`i hope it is going well ${req.params.name}`);
// });

// app.get("/search", (req, res) => {
//   console.log(req.query);
//   res.send(`You searched for: ${req.query.term}`);
// });

// app.get("/api/user/:id", (req, res) => {
//   res.json({
//     id: req.params.id,
//     name: "Testing users",
//     status: "active",
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// import express from "express";

// let app = express();

// app.get("/api/product/:id", (req, res) => {
//   res.json({
//     productName: "Laptops",
//     price: 30000,
//     id: req.params.id,
//   });
// });

// app.get("/api/greet/:firstname/:lastname", (req, res) => {
//   res.json({
//     firstname: req.params.firstname,
//     lastname: req.params.lastname,
//     Ptext: `Hello, ${req.params.firstname} ${req.params.lastname}`,
//   });
// });

// app.get("/api/discount/:price", (req, res) => {
//   if (req.params.price > 1000) {
//     res.json({
//       original: req.params.price,
//       discount: req.params.price * 0.9,
//     });
//   } else {
//     res.json({
//       original: req.params.price,
//       discount: req.params.price,
//     });
//   }
// });

// app.listen(3000, () => {
//   console.log("Your server is running on port 3000");
// });

// import express from "express";

// let app = express();

// app.get("/api/calculate", (req, res) => {
//   let num1 = Number(req.query.num1);
//   let num2 = Number(req.query.num2);
//   let op = req.query.operation.toUpperCase();

//   switch (op) {
//     case "ADD":
//       res.json({ Sum: num1 + num2 });
//       break;
//     case "SUBTRACT":
//       res.json({ Sum: num1 - num2 });
//       break;
//     case "MULTIPLY":
//       res.json({ Sum: num1 * num2 });
//       break;
//     case "DIVIDE":
//       if (num2 === 0) {
//         res.status(400).json({ error: "Can't divide by 0" });
//       } else {
//         res.json({ Sum: num1 / num2 });
//       }
//       break;
//     default:
//       res.json({ Invalid: "Operation is out of scope" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server started to run");
// });

import express from "express";

let app = express();

app.get("/api/employee/:id", (req, res) => {
  let incSalary = req.query.incSalary;
  if (incSalary === "true") {
    res.json({
      ID: req.params.id,
      Name: "Mahnoor",
      Salary: 5000,
    });
  } else {
    res.json({
      ID: req.params.id,
      Name: "Mahnoor",
    });
  }
});

app.listen(3000, () => {
  console.log("Your server is successfully runing!!!");
});

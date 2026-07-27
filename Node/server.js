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

// import express from "express";

// let app = express();

// app.get("/api/employee/:id", (req, res) => {
//   let incSalary = req.query.incSalary;
//   if (incSalary === "true") {
//     res.json({
//       ID: req.params.id,
//       Name: "Mahnoor",
//       Salary: 5000,
//     });
//   } else {
//     res.json({
//       ID: req.params.id,
//       Name: "Mahnoor",
//     });
//   }
// });

// app.listen(3000, () => {
//   console.log("Your server is successfully runing!!!");
// });

// import express from "express";

// let app = express();

// app.get("/api/isEven/:number", (req, res) => {
//   let num = Number(req.params.number);
//   if (num % 2 === 0) {
//     res.json({
//       Result: `${num} is Even`,
//     });
//   } else {
//     res.json({
//       Result: `${num} is Odd`,
//     });
//   }
// });

// app.listen(3000, () => {});

// app.post("/api/register/", (req, res) => {
//   console.log(req.body);
//   let username = req.body.username;
//   let password = req.body.password;

//   res.json({
//     message: "Registered",
//     username: username,
//   });
// });
// import express from "express";

// let app = express();

// app.use(express.json());

// app.post("/api/notes", (req, res) => {
//   let title = req.body.title;
//   let content = req.body.content;

//   res.json({
//     message: "Notes created",
//     title: title,
//   });
// });

// app.post("/api/login", (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   if (email.empty || password.empty) {
//     res.status(400).json({ error: " Email and Password are required!!" });
//   } else {
//     res.json({
//       message: "Login Successfull!!",
//       email: email,
//     });
//   }
// });

// app.post("/api/users/:id/comments", (req, res) => {
//   res.json({
//     ID: req.params.id,
//     comments: req.body.comments,
//   });
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// import express from "express";

// let app = express();

// app.use(express.json());

// app.post("/api/cart", (req, res) => {
//   let items = req.body.cart;
//   res.json({
//     itemCount: items.length,
//     items: items,
//   });
// });

// app.listen(3000, () => {
//   console.log(" your server is working perfectty");
// });

import express from "express";

let app = express();

app.use(express.json());

app.put("/api/notess/:id", (req, res) => {
  let id = req.params.id;
  let title = req.body.title;
  let content = req.body.content;

  res.json({
    Cmessage: "Successfull data updated",
  });
});

app.delete("/api/notes/:id", (req, res) => {
  res.json({
    id: req.params.id,
    Message: `Data succesfully deleted`,
  });
});

app.listen(3000, () => {
  console.log("Server running succesfully!!!");
});

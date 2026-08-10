// let fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

// fruits.forEach((i) => console.log(i));
// console.log(res);

// let students = [
//   { name: "Jawad", marks: 80 },
//   { name: "Ali", marks: 70 },
//   { name: "Ahmed", marks: 90 },
// ];

// students.forEach((i) => (i.marks += 5));

// console.log(students);

// let users = [
//   { name: "Jawad", verified: false },
//   { name: "Ali", verified: false },
//   { name: "Sara", verified: false },
// ];

// users.forEach((i) => (i.verified = true));

// console.log(users);

// Increase every employee's salary by 10%
// let employees = [
//   { name: "Ali", salary: 50000 },
//   { name: "Jawad", salary: 70000 },
//   { name: "Sara", salary: 60000 },
// ];

// // let new_emp = employees.map((i) => (i.salary += i.salary * 0.1));
// //================ OR =============
// let new_emp = employees.map((i) => ({
//   name: i.name,
//   salary: i.salary * 1.1,
// }));

// console.log(new_emp);

// Keep only students who scored 80 or above.

// let students = [
//   { name: "Ali", marks: 75 },
//   { name: "Jawad", marks: 95 },
//   { name: "Sara", marks: 82 },
//   { name: "Ahmed", marks: 60 },
// ];

// console.log(students.filter((i) => i.marks >= 80));

// Find the product whose ID is 103.

// let products = [
//   { id: 101, name: "Mouse" },
//   { id: 102, name: "Keyboard" },
//   { id: 103, name: "Monitor" },
//   { id: 104, name: "Laptop" },
// ];

// console.log(products.find((i) => i.id === 103));

// Question 4 — reduce()

// Find the total price.

// let cart = [
//   { item: "Book", price: 500 },
//   { item: "Bag", price: 2500 },
//   { item: "Pen", price: 100 },
//   { item: "Bottle", price: 900 },
// ];

// let Total_P = cart.reduce((T_P, i) => (T_P += i.price), 0);

// console.log(Total_P);

// Question 5 — forEach()

// Add a new property:

// verified: true

// to every user.

// let users = [{ name: "Ali" }, { name: "Jawad" }, { name: "Sara" }];

// users.forEach((i) => (i.verified = true));

// console.log(users);

// Find the total salary of all IT employees.

let employees = [
  { name: "Ali", department: "IT", salary: 50000 },
  { name: "Jawad", department: "HR", salary: 70000 },
  { name: "Sara", department: "IT", salary: 60000 },
  { name: "Ahmed", department: "Finance", salary: 55000 },
];

let T_salary = employees.reduce(
  (T_S, i) => (i.department === "IT" ? (T_S += i.salary) : T_S),
  0,
);

console.log(T_salary);

// You have a list of users:

let users = [
  { id: 1, name: "Ali", active: true },
  { id: 2, name: "Jawad", active: false },
  { id: 3, name: "Sara", active: true },
  { id: 4, name: "Ahmed", active: false },
];

let A_users = users.filter((i) => i.active === true);

let Count = A_users.length;

let names = A_users.map((i) => i.name);

console.log(`Active users: ${A_users} Count: ${Count} Nmaes: ${names}`);

let orders = [
  { id: 1, customer: "Ali", status: "Delivered", amount: 3000 },
  { id: 2, customer: "Jawad", status: "Pending", amount: 4500 },
  { id: 3, customer: "Sara", status: "Delivered", amount: 2000 },
  { id: 4, customer: "Ahmed", status: "Cancelled", amount: 1500 },
  { id: 5, customer: "Bilal", status: "Delivered", amount: 5000 },
];

let D_orders = orders.filter((i) => i.status === "Delivered");

console.log(D_orders);

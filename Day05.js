// Sort in ascending order:

// let numbers = [25, 5, 90, 12, 40];

// numbers.sort((i, j) => i - j);

// console.log(numbers);

// Sort employees by salary (highest first):

// let employees = [
//   { name: "Ali", salary: 50000 },
//   { name: "Jawad", salary: 70000 },
//   { name: "Sara", salary: 60000 },
// ];

// employees.sort((i, j) => {
//   return j.salary - i.salary;
// });

// console.log(employees);

// Check if any employee belongs to the "HR" department.

// let employees = [
//   { name: "Ali", department: "IT" },
//   { name: "Jawad", department: "Finance" },
//   { name: "Sara", department: "Marketing" },
// ];

// let res = employees.some((i) => i.department === "HR");

// console.log(res);

// let students = [
//   { name: "Ali", marks: 70 },
//   { name: "Jawad", marks: 90 },
//   { name: "Sara", marks: 45 },
// ];

// let res = students.every((I) => I.marks > 30);
// console.log(res);

// let prices = [1200, 2500, 1800, 3000, 900];

// // Create a new array where each price includes a 15% tax.

// let TaxPrices = prices.map((i) => (i += i * 0.15));

// console.log(TaxPrices);

// Question 2

// Given:

// let students = [
//   { name: "Ali", marks: 45 },
//   { name: "Jawad", marks: 92 },
//   { name: "Sara", marks: 78 },
//   { name: "Ahmed", marks: 55 },
// ];

// // Display only the students who scored more than 70 marks

// console.log(students.filter((i) => i.marks > 70));

// let employees = [
//   { id: 1, name: "Ali", department: "HR" },
//   { id: 2, name: "Jawad", department: "IT" },
//   { id: 3, name: "Sara", department: "Finance" },
// ];

// // Retrieve the employee whose id is 2

// console.log(employees.find((i) => i.id === 2));

// Given:

let orders = [
  { id: 1, customer: "Ali", status: "Delivered", amount: 3500 },
  { id: 2, customer: "Jawad", status: "Pending", amount: 4200 },
  { id: 3, customer: "Sara", status: "Delivered", amount: 1800 },
  { id: 4, customer: "Ahmed", status: "Cancelled", amount: 5000 },
  { id: 5, customer: "Bilal", status: "Delivered", amount: 2500 },
];

// Without changing the original array, answer these:

// Get all delivered orders.
// Calculate the total revenue from delivered orders.
// Find the order placed by "Sara".
// Print every customer's name.
// Arrange the orders from highest amount to lowest amount.

let D_orders = orders.filter((i) => i.status === "Delivered");

let T_revenue = orders.reduce((T_S, i) => (T_S += i.amount), 0);

let Names = orders.map((i) => i.customer);

console.log(
  "Dilvered orders: ",
  D_orders,
  "Total Revenue: ",
  T_revenue,
  "Order by Sara: ",
  orders.find((i) => i.customer === "Sara"),
  " names : ",
  Names,
  " Higest to lowest maount: ",
  orders.sort((i, j) => j.amount - i.amount),
);

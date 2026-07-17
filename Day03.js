// console.log("First js code");
// // alert("JS Loaded");

const Std = {
  name: "jawad",
  age: 20,
};

// console.log(Std);

// const product = {
//   name: "Panker Jotter Standard CT Ball Pen",
//   color: "black",
//   price: 270,
//   offer: 5,
//   Isavailable: true,
// };

// console.log(product);

// let num = 13;
// if (num % 2 == 0) {
//   console.log(num, " is even");
// } else {
//   console.log(num, " is odd");
// }

// num < 13
//   ? console.log(num, " is less than 13")
//   : console.log(num, " is greater than or equal to 13");

// let number = prompt("Enter your number: ");
// number % 5 == 0
//   ? console.log(number, " is divisible by 5")
//   : console.log(number, " is not divisible by 5");

let name = "Moshsin Khan";

// for (let i = 0; i < name.length; i++) {
//   console.log(name[i]);
// }

// for (let n of name) {
//   console.log(n);
// // }

// for (let i in Std) {
//   console.log(Std[i]);
// }

//===========Guessing Game================
// let num = prompt("Guess a number between 1 to 100: ");

// let Mynum = Math.floor(Math.random() * 100) + 1;

// while (Mynum != num) {
//   if (Mynum > num) {
//     alert("Your guess is too low, try again!");
//     num = prompt("enter the number again: ");
//   } else if (Mynum < num) {
//     alert("Your guess is too high, try again!");
//     num = prompt("enter the number again: ");
//   } else {
//     alert("Congratulations! You guessed the correct number: " + Mynum);
//   }
// }

// let name1 = prompt("Enter your name: ");

// let Useranme = name1 + "@gmail.com" + name1.length;
// console.log(Useranme);

// let price = [200, 230, 432, 353, 660, 453, 523, 533];

// for (let i = 0; i < price.length; i++) {
//   console.log(`Old price is; ${price[i]}`);

//   price[i] -= price[i] * 0.1;

//   console.log(`New price after 10% discount is: ${price[i]}`);
// }

// let companies = ["bloomberg", "google", "microsoft", "apple", "tesla"];

// companies.shift();
// console.log(companies);

// companies.splice(2, 1, "Ola");
// console.log(companies);

// companies.push("Amazon");
// console.log(companies);

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let double = numbers.map((num) => num * 2);

console.log(double);

let names = ["jawad", "ali", "ahmed"];

// Create a new array where every name is converted to uppercase.

console.log(names.map((i) => i.toUpperCase()));

let students = [
  {
    name: "Jawad",
    marks: 90,
  },
  {
    name: "Ali",
    marks: 80,
  },
  {
    name: "Ahmed",
    marks: 70,
  },
];

console.log(students.map((i) => i.name));

// Find students who passed:

let students = [
  { name: "Jawad", marks: 90 },
  { name: "Ali", marks: 40 },
  { name: "Ahmed", marks: 75 },
];

console.log(students.filter((i) => i.marks > 50));
// Condition:

// marks >= 50

// Find the product with name "Laptop":

let products = [
  { name: "Mouse", price: 2000 },
  { name: "Laptop", price: 90000 },
  { name: "Keyboard", price: 5000 },
];

console.log(products.find((i) => i.name === "Laptop"));

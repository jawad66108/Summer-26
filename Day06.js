// let ArrowMul = (a, b) => {
//   return a * b;
// };
// ArrowMul(3, 5);
// console.log(ArrowMul);

//Function the returns vowels

let st = "";
let vowels = "AEIOUaeiou";

// function Rvowels(s) {
//   for (let i = 0; i < s.length; i++) {
//     if (vowels.includes(s[i])) {
//       st += s[i];
//     }
//   }
//   return st;
// }

// Rvowels("Mahnoor");

// let Rvowels = (s) => {
//   le = s.length;
//   while (le > 0) {
//     if (vowels.includes(s[le])) {
//       st += s[le];
//     }
//     le--;
//   }
//   return st;
// };

// let arr = [1, 2, 3, 4, 5, 22];

// arr.forEach((i) => console.log(i * i));

// let arr = [21, 23, 44, 32, 52, 16];

// console.log(arr.filter((i) => i > 40));

// let n = prompt("Enter limit: ");
// let arr = [];
// for (let i = 1; i < n; i++) {
//   arr.push(i);
// }

// let Sum = arr.reduce((Sum, i) => (Sum += i), 0);
// let Prod = arr.reduce((Prod, i) => (Prod *= i), 1);

// console.log(`Product: ${Prod} Sum: ${Sum}`);

// let Laptop = {
//   brand: "Lexus",
//   model: 1989,
//   price: 50000,
//   color: "Voliet",
// };

// console.log(`Car model is: ${Laptop.model}`);

// let Book = {
//   price: 3000,
//   publisher: 1995,
// };

// console.log(Book);
// Book.price = 2000;
// delete Book.publisher;

// Book.author = "Jawad";

// console.log(Book);

// let teacher = {
//   introduction() {
//     "Hy everyone i am jawad your new instructor"
//   },
// };

// console.log(teacher.introduction);

// function Student(name, dep, gpa) {
//   ((this.name = name), (this.dep = dep), (this.gpa = gpa));
// }

// let s1 = new Student("Jawad", "CS", 3);
// let s2 = new Student("Mohsin", "CS", 3.2);
// let s3 = new Student("Ali", "CY", 3.3);

// console.log(s1, s2, s3);

function Student(name, marks) {
  this.name = name;
  this.marks = marks;
  this.ispassed = function () {
    this.marks >= 50
      ? console.log(`${this.name} is Passed`)
      : console.log(`${this.name} is failed`);
  };
}

let s1 = new Student("Jawad", 81);
s1.ispassed();

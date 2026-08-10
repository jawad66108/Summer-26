// let ArrowMul = (a, b) => {
//   return a * b;
// };
// ArrowMul(3, 5);
// console.log(ArrowMul);

// const { useTransition } = require("react");

//Function the returns vowels

// let st = "";
// let vowels = "AEIOUaeiou";

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

// function Student(name, marks) {
//   this.name = name;
//   this.marks = marks;
//   this.ispassed = function () {
//     this.marks >= 50
//       ? console.log(`${this.name} is Passed`)
//       : console.log(`${this.name} is failed`);
//   };
// }

// let s1 = new Student("Jawad", 81);
// s1.ispassed();

// class emp {
//   constructor(name, salary) {
//     this.name = name;
//     this.salary = salary;
//   }
//   giveBonus() {
//     return (this.salary += this.salary * 0.1);
//   }
// }

// let emp1 = new emp("Mohsin", 1000);
// console.log(emp1.salary);
// emp1.giveBonus();
// console.log(emp1.salary);

// class BankAccount {
//   constructor(accHolder, balance) {
//     this.accHolder = accHolder;
//     this.balance = balance;
//   }

//   deposit(amount) {
//     this.balance += amount;
//   }

//   withdraw(amount) {
//     this.balance -= amount;
//   }
// }

// let P1 = new BankAccount("Hamza Khan", 4000);
// console.log(P1);
// P1.deposit(30);
// console.log(P1);
// P1.withdraw(1000);
// console.log(P1);

// class Rectangle {
//   constructor(length, width) {
//     this.length = length;
//     this.width = width;
//   }

//   area() {
//     console.log(this.length * this.width);
//   }

//   perimeter() {
//     console.log("Have to look in for formula");
//   }
// }

// let r = new Rectangle(5, 4);

// r.area();

// r.perimeter();

// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   eat() {
//     console.log("Every animal must eat");
//   }
// }

// class Dog extends Animal {
//   constructor(name, bread) {
//     super(name);
//     this.bread = bread;
//   }
//   bark() {
//     console.log("Dogs brak to much");
//   }
// }

// let c = new Dog();
// console.log(c.bark);
// // console.log(c.eat);

// class emp {
//   constructor(name, salary) {
//     this.name = name;
//     this.salary = salary;
//   }
// }

// class manager extends emp {
//   constructor(name, salary, dep) {
//     super(name, salary);
//     this.dep = dep;
//   }

//   showdetails() {
//     console.log(
//       `Name: ${this.name} Salary: ${this.salary} Department: ${this.dep}`,
//     );
//   }
// }

// let emp1 = new manager("Mahnoor Saleem", 1000, "CS");
// emp1.showdetails();

// class user {
//   constructor(username, email) {
//     this.username = username;
//     this.email = email;
//   }

//   login() {
//     return "User successfully login";
//   }
// }

// class admin extends user {
//   constructor(username, email, role) {
//     super(username, email);
//     this.role = role;
//   }
//   delUser() {
//     return "The that was login is now deleted";
//   }
// }

// let A = new admin("Mohsin Khan", "Ronaldo@C.R", "Captain");

// A.login();
// A.delUser();



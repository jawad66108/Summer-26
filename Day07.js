// function greet(name) {
//   console.log(`hy i am ${name}`);
// }

// function Puser(back) {
//   back("Jawad");
// }

// Puser(greet);

// calculator(a,b,callback){
//   console.log(`Addition: ${a+b} Sub: ${a-b} Mult ${a*b} Divide: ${a/b}`);
// }

// function cal(callback){
//   callback(3,4)
// }

// function add(a, b) {
//   return a + b;
// }

// function sub(a, b) {
//   return a - b;
// }

// function multi(a, b) {
//   return a * b;
// }

// function divide(a, b) {
//   return a / b;
// }

// function cal(a, b, ope) {
//   return ope(a, b);
// }

// console.log(`Additon: ${(3, 4, add)}`);
// console.log(cal(23, 32, (x, y) => x - y));

// function greetUser(name, callback) {
//   callback(`Hello, ${name}!`);
// }

// greetUser("Mahnoor", function (message) {
//   console.log(message);
// });

//Doing with arrow function
// const greetUser = (name, callback) => {
//   callback(`Hello ${name}!`);
// };

// greetUser("Jawad", (callback) => {
//   console.log(callback);
// });

// function Greetuser(name, callback) {
//   callback(`Hy I am ${name}, How are you doing`);
// }

// function callback(name) {
//   console.log(name);
// }

// Greetuser("Mahnoor", callback);

// const PArray = (arr, callback) => {
//   for (let i = 0; i < arr.length; i++) {
//     callback(arr[i]);
//   }
// };

// PArray([2, 3, 4, 5], (i) => {
//   console.log(i * 2);
// });

// function checkNumber(arr, callback) {
//   for (let i = 0; i < arr.length; i++) {
//     arr[i] % 2 == 0
//       ? callback(`${arr[i]} => even`)
//       : callback(`${arr[i]} => Odd`);
//   }
// }

// checkNumber(
//   [12, 34, 42, 52, 543, 643, 34, 345, 765, 88, 5],
//   function (callback) {
//     console.log(callback);
//   },
// );

// //doing using the arrow function
// const CheckNumber = (arr, callback) => {
//   for (let i = 0; i < arr.length; i++) {
//     arr[i] % 2 == 0 ? callback(`${arr[i]} is a Even number`) : callback(arr[i]);
//   }
// };

// checkNumber([23, 34, 23, 52, 865, 957, 456, 35], (callback) => {
//   console.log(callback);
// });

// let applyD = (price, callback) => {
//   if (price > 1000) {
//     price -= price * 0.1;
//     callback(`Price after discount is ${price}`);
//   } else callback(`Price is less than 1000 you will not get discount!`);
// };

// applyD(23000, (callback) => {
//   console.log(callback);
// });

// console.log("Order Received");

// setTimeout(() => {
//   console.log("order is shipped!!");
// }, 2000);

// console.log("Processing......");

// function processOrder(ordername, callback) {
//   console.log(`Processing order: ${ordername}`);
//   setTimeout(() => {
//     callback(`${ordername} is ready!!`);
//   }, 2000);
// }

// processOrder("2 Pizzia with 2 drinks", function (callback) {
//   console.log(callback);
// });

//doing it with arrow function
// let processorder = (ordername, callback) => {
//   console.log(`Processing order: ${ordername}`);
//   setTimeout(() => {
//     callback(`${ordername} is ready!!`);
//   }, 2000);
// };

// processorder("1 Burgur with 2 fires bucket", (callback) => {
//   console.log(callback);
// });

// let makecoffe = (callback) => {
//   console.log("Boiling water......");
//   setTimeout(() => {
//     console.log("Water boiled, adding coffee....");
//     setTimeout(() => {
//       callback(`Coffe is ready`);
//     }, 1000);
//   }, 1500);
// };

// makecoffe((callback) => {
//   console.log(callback);
// });

// let checklogin = (username, password, callback) => {
//   console.log(`Checking credentials...`);
//   setTimeout(() => {
//     if (username === "admin" && password === "1234") {
//       callback(`login successfull as ${username}`);
//     } else {
//       callback(`Login Failed Try Again`);
//     }
//   }, 2000);
// };

// checklogin("admin", "1234", (callback) => {
//   console.log(callback);
// });

// let withdrawMoney = (balance, amount, callback) => {
//   console.log("Processing withdrawal...");
//   setTimeout(() => {
//     if (amount <= balance) {
//       callback(`Withdrawal successful. New balance: ${balance - amount}`);
//     } else {
//       callback`Insufficient funds`;
//     }
//   }, 1500);
// };

// withdrawMoney(1000, 400, (callback) => {
//   console.log(callback);
// });

// let processOrders = (orders, callback) => {
//   for (let i = 0; i < orders.length; i++) {
//     console.log(`order received: ${orders[i]}`);
//     setTimeout(() => {
//       callback(`${orders[i]} is ready!`);
//     }, 1000);
//   }
// };

// processOrders(["Pizza", "Burger"], (callback) => {
//   console.log(callback);
// });

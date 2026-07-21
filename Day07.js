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

function checkNumber(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] % 2 == 0
      ? callback(`${arr[i]} => even`)
      : callback(`${arr[i]} => Odd`);
  }
}

checkNumber(
  [12, 34, 42, 52, 543, 643, 34, 345, 765, 88, 5],
  function (callback) {
    console.log(callback);
  },
);

//doing using the arrow function
const CheckNumber = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    arr[i] % 2 == 0 ? console.log(`${arr[i]} is a Even number`) : arr[i];
  }
};

checkNumber([23, 34, 23, 52, 865, 957, 456, 35], (callback) => {
  console.log(callback);
});

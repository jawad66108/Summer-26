// let age = 10;

// let p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (age >= 18) {
//       resolve(`You are allowed`);
//     } else {
//       reject(`Your are not allowed`);
//     }
//   }, 1000);
// });

// p1.then((res) => {
//   console.log(res);
// }).catch((err) => {
//   console.log(err);
// });

// let age = 10;

// let checkAge = (age) => {
//   return new Promise((resolve, reject) => {
//     console.log(`Checking the age....`);
//     setTimeout(() => {
//       console.log(`furthur validating....`);
//       setTimeout(() => {
//         age >= 18 ? resolve(`You are allowed`) : reject(`You are rejected`);
//       }, 1000);
//     }, 2000);
//   });
// };

// checkAge(age)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// let fetchUser = (userId) => {
//   return new Promise((resolve, reject) => {
//     console.log(`Fetching user data...`);
//     setTimeout(() => {
//       userId > 0
//         ? resolve(`{ id: userId, name: "User" + ${userId}}`)
//         : reject(`Invalid user ID`);
//     }, 1500);
//   });
// };

// fetchUser(108)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// let doubleAfterDelay = (num) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(num * 2);
//     }, 1000);
//   });
// };

// doubleAfterDelay(29)
//   .then((res) => {
//     console.log(res);
//     return res * 2;
//   })
//   .then((res) => {
//     console.log(res);
//     return res + 10;
//   })
//   .then((res) => {
//     console.log(res);
//   });

// let withdraw = (balance, amount) => {
//   return new Promise((resolve, reject) => {
//     amount > balance
//       ? reject(`Insufficient funds`)
//       : resolve(`New Balance: ${balance - amount}`);
//   });
// };

// withdraw(1000, 150)
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// let fetchUser = (userId) => {
//   return new Promise((resolve, reject) => {
//     console.log(`Fetching user data...`);
//     setTimeout(() => {
//       userId > 0
//         ? resolve(`{ id: ${userId}, name: "User" + ${userId}}`)
//         : reject(`Invalid user ID`);
//     }, 1500);
//   });
// };

// Promise.all([fetchUser(23), fetchUser(34), fetchUser(55)])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// let checkAge = (age) => {
//   return new Promise((resolve, reject) => {
//     console.log(`Checking the age....`);
//     setTimeout(() => {
//       console.log(`furthur validating....`);
//       setTimeout(() => {
//         age >= 18 ? resolve(`You are allowed`) : reject(`You are rejected`);
//       }, 1000);
//     }, 2000);
//   });
// };

// let age = 20;
// async function run() {
//   try {
//     await checkAge((age) => {
//       console.log(res);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// run();

let balance = 1000;
let deposit = (balance, amount) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(balance + amount);
    }, 1000);
  });
};

async function run() {
  // try{
  //     await deposit((balance,200) => {
  //         console.log(res);
  //     });
  // }

  let newbalance = await deposit(balance, 200);
  console.log(newbalance);
}

run();

// let getScore = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(85);
//     }, 1000);
//   });
// };

// async function run() {
//   let score = await getScore();
//   console.log(score);
// }

// let deposit = (balance, amount) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(balance + amount);
//     }, 1000);
//   });
// };

// let balance = 1000;

// async function run() {
//   let newbalance1 = await deposit(balance, 300);
//   console.log(newbalance1);
//   console.log(`(...1 second delay...)`);
//   let newbalance2 = await deposit(newbalance1, 300);
//   console.log(newbalance2);
// }

// userId = [23, 42, 22];

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

// async function getUser() {
//   try {
//     let [user1, user2] = await Promise.all([(fetchUser(1), fetchUser(2))]);
//     console.log(user1);
//     console.log(user2);
//   } catch (err) {
//     console.log(err);
//   }
// }

// let fetchOrder = (orderId) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (orderId > 0) resolve(`${orderId} , status: Shipped}`);
//       else reject`Invalid order ID.`;
//     }, 1000);
//   });
// };

// async function getOrders() {
//   try {
//     let orders = await Promise.all([
//       fetchOrder(101),
//       fetchOrder(108),
//       fetchOrder(110),
//     ]);
//     console.log(orders);
//   } catch (err) {
//     console.log(err);
//   }
// }
// getOrders();

let checkStock = (itemname, quantity) => {
  return new Promise((resolve, rejcet) => {
    console.log(`Checking the Inventory....`);
    setTimeout(() => {
      quantity >= 10
        ? resolve(`${itemname} is in stock`)
        : reject(`${itemname} is low on stock`);
    }, 1500);
  });
};

async function checkInventory() {
  try {
    let stock = await checkStock(`Laptop`, 15);
    console.log(stock);
  } catch (err) {
    console.log(err);
  }
}

checkInventory();

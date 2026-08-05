use("ecommerce");

// db.products.updateOne(
//   {
//     name: "Gamming Chair",
//   },
//   {
//     $set: { price: 5500 },
//   },
// );

// db.products.updateOne(
//   {
//     productId: "ORD010",
//   },
//   {
//     $set: {
//       status: "Delivered",
//     },
//   },
// );

// db.products.updateOne(
//   {
//     name: "MacBook Air M3",
//   },
//   {
//     $set: {
//       warranty: 3,
//     },
//   },
// );

// db.products.updateOne(
//     {
//         name : "Wireless Mouse"
//     },
//     {
//         $set : {
//             Stock : 80,
//             Discount : 20
//         }
//     }
// )

// db.products.updateMany(
//   {
//     category: "Mobile",
//   },
//   {
//     $inc: {
//       stock: 8,
//     },
//   },
// );

// db.products.updateMany(
//   {
//     payment: "Card",
//   },
//   {
//     $set: {
//       shipping: "Free",
//     },
//   },
// );

// db.products.updateOne(
//     {
//         name : "MacBook Air M3"
//     },{
//         $push : {
//             tag : "Premium"
//         }
//     }
// )

// db.products.update(
//   {
//     productId:"P006",
//   },
//   {
//     $push: {
//       name: "Wireless Mouse",
//       quantity: 2,
//       price: 6500,
//     },
//   },
// );

db.products.updateOne(
  {
    name: "Gaming Laptop",
  },
  {
    $push: {
      features: "HDR Support",
    },
  },
);

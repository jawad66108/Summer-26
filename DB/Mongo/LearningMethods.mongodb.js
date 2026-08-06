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

// db.products.updateOne(
//   {
//     name: "Gaming Laptop",
//   },
//   {
//     $push: {
//       features: "HDR Support",
//     },
//   },
// );

// db.products.deleteOne({
//   productId: "P008",
// });

// db.products.deleteMany({
//   rating: { $lt: 4.6 },
// });

// db.products.createIndex({
//   price: 1,
// });

// db.products.createIndex({
//   status: 1,
// });

// db.products.getIndexes();

// db.products.find({
//     category: "Laptop"
// }).explain("executionStats")

// db.products.aggregate([
//   {
//     $match: {
//       brand: "Samsung",
//     },
//   },
// ]);

// db.products.find({ brand: "Samsung" })

// db.products.aggregate([
//   {
//     $match: {
//       category: "Laptop",
//       price: {
//         $gt: 2000,
//       },
//     },
//   },
// ]);

// db.orders.aggregate([
//   {
//     $match: {
//       status: "Delivered",
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $project: {
//       name: 1,
//       brand: 1,
//       _id: 0,
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $project: {
//       productname: "$name",
//       productPrice: "$price",
//       _id: 0,
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $match: {
//       brand: "Samsung",
//     },
//   },
//   {
//     $project: {
//       name: 1,
//       price: 1,
//       _id: 0,
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $project: {
//       name: 1,
//       price: 1,
//       _id:0
//     },
//   },
//   {
//     $sort: {
//       price: -1,
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $match: {
//       brand: "Apple",
//     },
//   },
//   {
//     $project: {
//       name: 1,
//       price: 1,
//       _id: 0,
//     },
//   },
//   {
//     $sort: {
//       price: -1,
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $sort: {
//       price: -1,
//     },
//   },
//   {
//     $limit: 3,
//   },
// ]);

// db.orders.aggregate([
//   {
//     $group: {
//       _id: "$status",
//       sum: {
//         $sum: 1,
//       },
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $group: {
//       _id: "$category",
//       sum: {
//         $sum: "$price",
//       },
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $group: {
//       _id: "$category",
//       count: {
//         $sum: 1,
//       },
//       Tsum: {
//         $sum: "$price",
//       },
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $group: {
//       _id: "$brand",
//       fieldN: {
//         $avg: "$rating",
//       },
//     },
//   },
// ]);

// db.products.aggregate([
//   {
//     $group: {
//       _id: "$category",
//       cheapest: {
//         $min: "$price",
//       },
//       MExpensive: {
//         $max : "$price",
//       }
//     },
//   },
// ]);

db.products.aggregate([
  {
    $group: {
      _id: "$category",
      TProducts: {
        $sum: "$name",
      },
      Stock: {
        $sum: "$stock",
      },
      AvgP: {
        $avg: "$price",
      },
      CP: {
        $min: "$price",
      },
      HP: {
        $max: "$price",
      },
    },
  },
]);

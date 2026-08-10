/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("ecommerce");

// Create a new document in the collection.
db.students.insertMany([
  {
    name: "Ali",
    age: 20,
    city: "Lahore",
    grade: "A",
  },
  {
    name: "Ahmed",
    age: 21,
    city: "Karachi",
    grade: "B",
  },
  {
    name: "Sara",
    age: 19,
    city: "Islamabad",
    grade: "A",
  },
  {
    name: "Ayesha",
    age: 22,
    city: "Rawalpindi",
    grade: "C",
  },
  {
    name: "Usman",
    age: 20,
    city: "Peshawar",
    grade: "B",
  },
]);

use("ecommerce");

// db.students.find({ age: { $gt: 20 } }, { _id: 0 });

// db.students.find().sort({ age: 1 }).limit(3);
// db.students.find({}, { name: 1, age: 1, _id: 0 });

// db.students.find({ city: { $in: ["Lahore", "Islamabad"] } }, { _id: 0 });

// db.students.find({ grade: "A" });

db.students.updateOne(
  { name: "Ali" },
  { $set: { subjects: ["Math", "Physics", "AI"] } },
);

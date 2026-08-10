import pg from "pg";
const { Pool } = pg;

let db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "JS_learning_Backend",
  password: "openmyaccount",
  port: 5432,
});

export default db;

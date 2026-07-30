import pg from "pg";
let { Pool } = pg;

let pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "JS_learning_Backend",
  password: "openmyaccount",
  port: 5432,
});

export default pool;

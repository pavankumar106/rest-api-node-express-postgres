const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "students",
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
module.exports = pool;

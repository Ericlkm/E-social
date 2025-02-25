const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});
console.log("Connected to MySQL server");

module.exports = db;

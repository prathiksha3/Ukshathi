const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL!");

  db.query("SELECT DATABASE();", (err, result) => {
    if (err) {
      console.error("⚠️ Error checking database:", err.message);
    } else {
      console.log("📂 Currently using database:", result[0]["DATABASE()"]);
    }
  });
});
console.log("Using database:", process.env.DB_NAME);

module.exports = db;

const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS, // Load MySQL password from .env
  database: "inventory_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

// Secret Key for JWT (Now Loaded from .env)
const SECRET_KEY = process.env.JWT_SECRET;

// 🔹 Employee Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM employees WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: results[0].id }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  });
});

// 🔹 Add Stock API
app.post("/api/stocks", (req, res) => {
  const { product_name, quantity, price } = req.body;
  db.query("INSERT INTO stocks (product_name, quantity, price) VALUES (?, ?, ?)", [product_name, quantity, price], (err) => {
    if (err) return res.status(500).json({ message: "Error adding stock" });
    res.json({ message: "Stock added successfully" });
  });
});

// 🔹 View Stocks API
app.get("/api/stocks", (req, res) => {
  db.query("SELECT * FROM stocks", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching stocks" });
    res.json(results);
  });
});

// 🔹 Update Stock API
app.put("/api/stocks/:id", (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  db.query("UPDATE stocks SET quantity = ?, price = ? WHERE id = ?", [quantity, price, id], (err) => {
    if (err) return res.status(500).json({ message: "Error updating stock" });
    res.json({ message: "Stock updated successfully" });
  });
});

// 🔹 Delete Stock API
app.delete("/api/stocks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM stocks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting stock" });
    res.json({ message: "Stock deleted successfully" });
  });
});

// 🔹 Deduct Inventory (Spent)
app.post("/api/spent", (req, res) => {
  const { product_name, quantity, price } = req.body;
  db.query("INSERT INTO spent_inventory (product_name, quantity, price) VALUES (?, ?, ?)", [product_name, quantity, price], (err) => {
    if (err) return res.status(500).json({ message: "Error adding spent stock" });
    res.json({ message: "Spent stock recorded" });
  });
});

// 🔹 Get Spent Inventory API
app.get("/api/spent", (req, res) => {
  db.query("SELECT * FROM spent_inventory", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching spent inventory" });
    res.json(results);
  });
});

// Start Server
app.listen(5000, () => {
  console.log("✅ Server running on port 5000...");
});

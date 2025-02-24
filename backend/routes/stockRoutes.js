const express = require("express");
const router = express.Router(); // ✅ This line is missing in your file!
const db = require("../config/db");

// Get all stocks
router.get("/", (req, res) => {
  db.query("SELECT * FROM Stock", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add new stock
router.post("/", (req, res) => {
  const { item_name, category_id, quantity, price_pu } = req.body;
  db.query(
    "INSERT INTO Stock (item_name, category_id, quantity, price_pu) VALUES (?, ?, ?, ?)",
    [item_name, category_id, quantity, price_pu],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Stock added successfully", stockId: result.insertId });
    }
  );
});

// Update stock quantity
router.put("/:id", (req, res) => {
  const { quantity } = req.body;
  db.query(
    "UPDATE Stock SET quantity = ? WHERE stock_id = ?",
    [quantity, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Stock updated successfully" });
    }
  );
});

// Delete stock
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM Stock WHERE stock_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Stock deleted successfully" });
  });
});

module.exports = router; // ✅ Make sure you are exporting the router

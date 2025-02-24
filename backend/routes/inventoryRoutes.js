const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ✅ Get all inventory spent records
router.get("/", (req, res) => {
  const sql = `
    SELECT i.spent_id, s.item_name, i.quantity_used, i.used_for, i.recorded_by, i.remark, i.recorded_at
    FROM inventory_spent i
    JOIN stock s ON i.stock_id = s.stock_id
    ORDER BY i.recorded_at DESC`;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Record inventory usage with stock deduction
router.post("/", (req, res) => {
  const { stock_id, quantity_used, used_for, recorded_by, remark } = req.body;

  if (!stock_id || !quantity_used) {
    return res.status(400).json({ error: "Stock ID and quantity used are required" });
  }

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ error: err.message });

    // Step 1: Check available stock
    db.query("SELECT quantity FROM stock WHERE stock_id = ?", [stock_id], (err, results) => {
      if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

      if (results.length === 0) {
        return db.rollback(() => res.status(404).json({ error: "Stock item not found" }));
      }

      const availableQuantity = results[0].quantity;
      if (availableQuantity < quantity_used) {
        return db.rollback(() => res.status(400).json({ error: "Not enough stock available" }));
      }

      // Step 2: Deduct stock quantity
      db.query("UPDATE stock SET quantity = quantity - ? WHERE stock_id = ?", [quantity_used, stock_id], (err) => {
        if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

        // Step 3: Insert inventory usage record
        db.query(
          "INSERT INTO inventory_spent (stock_id, quantity_used, used_for, recorded_by, remark) VALUES (?, ?, ?, ?, ?)",
          [stock_id, quantity_used, used_for, recorded_by, remark],
          (err, result) => {
            if (err) return db.rollback(() => res.status(500).json({ error: err.message }));

            db.commit((err) => {
              if (err) return db.rollback(() => res.status(500).json({ error: err.message }));
              res.json({ message: "Inventory usage recorded", spentId: result.insertId });
            });
          }
        );
      });
    });
  });
});

module.exports = router;

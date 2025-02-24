const StockModel = require("../models/stockModel");

exports.getAllStock = (req, res) => {
  StockModel.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getStockById = (req, res) => {
  const { id } = req.params;
  StockModel.getById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json(result[0]);
  });
};

exports.createStock = (req, res) => {
  const stockData = req.body;
  StockModel.create(stockData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Stock added successfully!", stock_id: result.insertId });
  });
};

exports.updateStock = (req, res) => {
  const { id } = req.params;
  const stockData = req.body;
  StockModel.update(id, stockData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Stock updated successfully!" });
  });
};

exports.deleteStock = (req, res) => {
  const { id } = req.params;
  StockModel.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Stock deleted successfully!" });
  });
};

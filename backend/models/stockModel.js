const db = require("../config/db");

const StockModel = {
  getAll: (callback) => {
    db.query("SELECT * FROM stock", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM stock WHERE stock_id = ?", [id], callback);
  },

  create: (stockData, callback) => {
    db.query("INSERT INTO stock SET ?", stockData, callback);
  },

  update: (id, stockData, callback) => {
    db.query("UPDATE stock SET ? WHERE stock_id = ?", [stockData, id], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM stock WHERE stock_id = ?", [id], callback);
  }
};

module.exports = StockModel;

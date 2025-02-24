class Stock {
    constructor(stock_id, item_name, category_id, quantity, price_pu) {
      this.stock_id = stock_id;
      this.item_name = item_name;
      this.category_id = category_id;
      this.quantity = quantity;
      this.price_pu = price_pu;
    }
  }
  
  module.exports = Stock;
  
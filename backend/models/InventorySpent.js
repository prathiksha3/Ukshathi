class InventorySpent {
    constructor(spent_id, stock_id, quantity_used, used_for, recorded_by, remark) {
      this.spent_id = spent_id;
      this.stock_id = stock_id;
      this.quantity_used = quantity_used;
      this.used_for = used_for;
      this.recorded_by = recorded_by;
      this.remark = remark;
    }
  }
  
  module.exports = InventorySpent;
  
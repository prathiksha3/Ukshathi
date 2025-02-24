"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function StockDetails() {
  const [stocks, setStocks] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [spendQuantity, setSpendQuantity] = useState({});
  const [showStockList, setShowStockList] = useState(false);

  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    if (storedStocks.length > 0) {
      setStocks(storedStocks);
      setShowStockList(true);
    }
  }, []);

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!categoryId || !productName || !quantity || !price) return;

    const newStock = { 
      id: Date.now(), 
      categoryId, 
      productName, 
      quantity: parseInt(quantity), 
      price: parseFloat(price)
    };
    const updatedStocks = [...stocks, newStock];

    setStocks(updatedStocks);
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));

    setCategoryId("");
    setProductName("");
    setQuantity("");
    setPrice("");
    setShowStockList(true);
  };

  const handleSpendStock = (id) => {
    const spentQty = parseInt(spendQuantity[id]) || 0;
    if (spentQty <= 0) return;

    const updatedStocks = stocks.map((stock) => {
      if (stock.id === id) {
        const pricePerUnit = stock.price / stock.quantity;
        const newQuantity = Math.max(0, stock.quantity - spentQty);
        const newPrice = newQuantity * pricePerUnit;

        return { ...stock, quantity: newQuantity, price: parseFloat(newPrice.toFixed(2)) };
      }
      return stock;
    });

    setStocks(updatedStocks);
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));

    setSpendQuantity({ ...spendQuantity, [id]: "" });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/automated-inventory-management-system-wallpaper_987764-40035.jpg')",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Stock Management</h1>

      {/* ✅ Add Stock Container */}
      <form onSubmit={handleAddStock} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mb-10 bg-opacity-90">
        <h2 className="text-2xl font-semibold mb-4">Add Stock</h2>

        {/* Category Dropdown */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Automation">Automation</option>
            <option value="Drip">Drip</option>
            <option value="Labour">Labour</option>
            <option value="Pumping">Pumping</option>
            <option value="Tools">Tools</option>
          </select>
        </div>

        {/* Product Name */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Price */}
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-bold mb-2">Total Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded text-lg hover:bg-blue-700">
          Add Stock
        </button>
      </form>

      {/* ✅ Stock List - Only Appears After Adding Stock */}
      {showStockList && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl bg-opacity-90 mt-10">
          <h2 className="text-xl font-semibold mb-4">Stock List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-3 py-2">Product</th>
                  <th className="border border-gray-300 px-3 py-2">Quantity</th>
                  <th className="border border-gray-300 px-3 py-2">Total Price</th>
                  <th className="border border-gray-300 px-3 py-2">Category</th>
                  <th className="border border-gray-300 px-3 py-2">Spend</th>
                </tr>
              </thead>
              <tbody>
                {stocks.map((stock) => (
                  <tr key={stock.id} className="text-center">
                    <td className="border border-gray-300 px-3 py-2">{stock.productName}</td>
                    <td className="border border-gray-300 px-3 py-2">{stock.quantity}</td>
                    <td className="border border-gray-300 px-3 py-2">${stock.price}</td>
                    <td className="border border-gray-300 px-3 py-2">{stock.categoryId}</td>
                    <td className="border border-gray-300 px-3 py-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                        <input
                          type="number"
                          min="1"
                          max={stock.quantity}
                          value={spendQuantity[stock.id] || ""}
                          onChange={(e) => setSpendQuantity({ ...spendQuantity, [stock.id]: e.target.value })}
                          className="w-16 p-2 border border-gray-300 rounded text-center"
                        />
                        <button
                          onClick={() => handleSpendStock(stock.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700 mt-2 sm:mt-0"
                        >
                          Deduct
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ✅ View Inventory Spent & Back Buttons */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 mt-6">
        <Link href="/inventory-spent">
          <button className="bg-green-600 text-white p-3 rounded hover:bg-green-700 w-full sm:w-auto">
            View Inventory Spent
          </button>
        </Link>
        <Link href="/home">
          <button className="bg-gray-600 text-white p-3 rounded hover:bg-gray-700 w-full sm:w-auto mt-2 sm:mt-0">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}

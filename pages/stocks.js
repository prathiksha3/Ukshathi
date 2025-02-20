"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function StockDetails() {
  const [stocks, setStocks] = useState([]);
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [spendQuantity, setSpendQuantity] = useState({});

  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(storedStocks);
  }, []);

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!productName || !quantity || !price) return;

    const newStock = { id: Date.now(), productName, quantity: parseInt(quantity), price: parseFloat(price) };
    const updatedStocks = [...stocks, newStock];

    setStocks(updatedStocks);
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));

    setProductName("");
    setQuantity("");
    setPrice("");
  };

  const handleSpendStock = (id) => {
    const spentQty = parseInt(spendQuantity[id]) || 0;
    if (spentQty <= 0) return;
  
    const updatedStocks = stocks.map((stock) => {
      if (stock.id === id) {
        const pricePerUnit = stock.price / stock.quantity; // Correct unit price calculation
        const newQuantity = Math.max(0, stock.quantity - spentQty);
        const newPrice = newQuantity * pricePerUnit; // Remaining stock price after deduction
  
        return { ...stock, quantity: newQuantity, price: parseFloat(newPrice.toFixed(2)) };
      }
      return stock;
    });
  
    setStocks(updatedStocks);
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));
  
    // Store deducted stock separately
    const spentStocks = JSON.parse(localStorage.getItem("spentStocks")) || [];
    const stockSpent = stocks.find((stock) => stock.id === id);
  
    if (stockSpent) {
      const pricePerUnit = stockSpent.price / stockSpent.quantity; // Recalculate unit price before deduction
      const totalSpentCost = pricePerUnit * spentQty; // Calculate spent stock cost
  
      const spentEntry = {
        id: Date.now(),
        productName: stockSpent.productName,
        quantity: spentQty,
        price: totalSpentCost.toFixed(2), // Store with two decimal places
      };
  
      const updatedSpentStocks = [...spentStocks, spentEntry];
      localStorage.setItem("spentStocks", JSON.stringify(updatedSpentStocks));
    }
  
    setSpendQuantity({ ...spendQuantity, [id]: "" });
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Stock Management</h1>

      <form onSubmit={handleAddStock} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Add Stock</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Total Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Add Stock
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Stock List</h2>
        {stocks.length === 0 ? (
          <p className="text-gray-500">No stock available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Product</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Total Price</th>
                <th className="border border-gray-300 p-2">Spend</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id} className="text-center">
                  <td className="border border-gray-300 p-2">{stock.productName}</td>
                  <td className="border border-gray-300 p-2">{stock.quantity}</td>
                  <td className="border border-gray-300 p-2">{stock.price}</td>
                  <td className="border border-gray-300 p-2 flex justify-center items-center space-x-2">
                    <input
                      type="number"
                      min="1"
                      max={stock.quantity}
                      value={spendQuantity[stock.id] || ""}
                      onChange={(e) => setSpendQuantity({ ...spendQuantity, [stock.id]: e.target.value })}
                      className="w-16 p-1 border border-gray-300 rounded"
                    />
                    <button
                      onClick={() => handleSpendStock(stock.id)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                    >
                      Deduct
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link href="/inventory-spent">
        <button className="mt-4 bg-green-600 text-white p-2 rounded hover:bg-green-700">
          View Spent Inventory
        </button>
      </Link>
      <Link href="/home">
  <button className="mt-2 bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
    Back to Home
  </button>
</Link>

    </div>
  );
}

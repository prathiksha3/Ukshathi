"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // ✅ Import Link

export default function InventorySpent() {
  const [spentStocks, setSpentStocks] = useState([]);

  useEffect(() => {
    const storedSpentStocks = JSON.parse(localStorage.getItem("spentStocks")) || [];
    setSpentStocks(storedSpentStocks);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory Spent</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Spent Stock List</h2>
        {spentStocks.length === 0 ? (
          <p className="text-gray-500">No spent stock available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Product</th>
                <th className="border border-gray-300 p-2">Quantity</th>
                <th className="border border-gray-300 p-2">Spent Cost</th>
              </tr>
            </thead>
            <tbody>
              {spentStocks.map((spent, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{spent.productName}</td>
                  <td className="border border-gray-300 p-2">{spent.quantity}</td>
                  <td className="border border-gray-300 p-2">{spent.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Back to Home Button */}
      <div className="mt-6">
        <Link href="/home">
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

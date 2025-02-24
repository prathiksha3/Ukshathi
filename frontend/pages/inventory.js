import { useEffect, useState } from "react";
import axios from "axios";

export default function Inventory() {
  const [items, setItems] = useState([]);

  // Fetch stock data from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/stocks")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching stocks:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Stock Management</h1>
      <table className="w-full mt-4 border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Item</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.product_name}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">${item.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="border p-2 text-center text-gray-500">
                No stock available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

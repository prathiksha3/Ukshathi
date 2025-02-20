import { useEffect, useState } from "react";
import Link from "next/link";

export default function StockUpdate() {
  const [userRole, setUserRole] = useState("");
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Retrieve user role and stock details from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(storedStocks);
  }, []);

  // Function to update a specific stock item by adding to the quantity
  const handleUpdateStock = (index) => {
    if (userRole !== "admin") return;

    const additionalQuantity = prompt("Enter quantity to add:");
    if (additionalQuantity === null || isNaN(additionalQuantity) || additionalQuantity < 0) return;

    const updatedStocks = [...stocks];
    updatedStocks[index].quantity += Number(additionalQuantity); // Adding instead of replacing

    // Update state and localStorage
    setStocks(updatedStocks);
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));

    alert("Stock updated successfully!");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Stock Details</h1>

      {/* Stock Details Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        {stocks.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Product Name</th>
                <th className="border border-gray-300 p-2">Remaining Quantity</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{stock.productName}</td>
                  <td className="border border-gray-300 p-2">{stock.quantity}</td>
                  <td className="border border-gray-300 p-2">${stock.price}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className={`px-3 py-1 rounded ${
                        userRole === "admin"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-400 text-gray-700 cursor-not-allowed"
                      }`}
                      disabled={userRole !== "admin"}
                      onClick={() => handleUpdateStock(index)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No stocks available.</p>
        )}
      </div>

      {/* Back to Home Button */}
      <Link href="/home">
        <button className="mt-4 bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

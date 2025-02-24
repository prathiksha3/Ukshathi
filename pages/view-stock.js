import { useEffect, useState } from "react";
import Link from "next/link"; // ✅ Import Link

export default function ViewStock() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(storedStocks);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Stock Details</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto w-full">
        {stocks.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Product Name</th>
                <th className="border border-gray-300 p-2">Remaining Quantity</th>
                <th className="border border-gray-300 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{stock.productName}</td>
                  <td className="border border-gray-300 p-2">{stock.quantity}</td>
                  <td className="border border-gray-300 p-2">${stock.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No stocks available.</p>
        )}
      </div>

      {/* Back to Home Button */}
      <div className="flex justify-center mt-6">
        <Link href="/home">
          <button className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StockUpdate() {
  const [userRole, setUserRole] = useState("");
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);

    const storedStocks = JSON.parse(localStorage.getItem("stocks")) || [];
    setStocks(storedStocks);
  }, []);

  const handleUpdateStock = (index) => {
    if (userRole !== "admin") return;

    const additionalQuantity = prompt("Enter quantity to add:");
    if (!additionalQuantity || isNaN(additionalQuantity) || additionalQuantity < 0) return;

    const additionalPrice = prompt("Enter additional price:");
    if (!additionalPrice || isNaN(additionalPrice) || additionalPrice < 0) return;

    const updatedStocks = [...stocks];

    updatedStocks[index].quantity += Number(additionalQuantity);
    updatedStocks[index].price += parseFloat(additionalPrice);

    setStocks(updatedStocks);
    localStorage.setItem("stocks", JSON.stringify(updatedStocks));

    alert("Stock updated successfully!");
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-gray-100 p-6"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/automated-inventory-management-system-wallpaper_987764-40035.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-white">Stock Details</h1>

      {/* ✅ White Transparent Container */}
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-4xl w-full">
        {stocks.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2 text-gray-900">Product Name</th>
                <th className="border border-gray-300 p-2 text-gray-900">Remaining Quantity</th>
                <th className="border border-gray-300 p-2 text-gray-900">Total Price</th>
                <th className="border border-gray-300 p-2 text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index} className="text-center text-gray-900 bg-gray-100">
                  <td className="border border-gray-300 p-2">{stock.productName}</td>
                  <td className="border border-gray-300 p-2">{stock.quantity}</td>
                  <td className="border border-gray-300 p-2">{stock.price}</td>
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
        ) : null}

        {stocks.length === 0 && (
          <p className="text-center text-gray-600">No stocks available.</p>
        )}
      </div>

      <Link href="/home">
        <button className="mt-4 bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

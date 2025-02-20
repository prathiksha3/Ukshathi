import { useRouter } from "next/router";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center text-gray-900"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/automated-inventory-management-system-wallpaper_987764-40035.jpg')",
      }}
    >
      {/* Main Container */}
      <div className="flex flex-col items-center justify-center flex-grow p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-white shadow-md">
          Inventory Management System
        </h1>

        {/* Card Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Add Stock */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push("/stocks")}
          >
            <FaPlus className="text-blue-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-center">Add Stock</h2>
          </div>

          {/* View Stock */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push("/view-stock")}
          >
            <FaEye className="text-green-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-center">View Stock</h2>
          </div>

          {/* Update Stock */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push("/update-stock")}
          >
            <FaEdit className="text-yellow-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-center">Update Stock</h2>
          </div>

          {/* Delete Stock */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => router.push("/inventory-spent")}
          >
            <FaTrash className="text-red-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-center">Inventory Spent</h2>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-4 text-center fixed bottom-0 left-0">
        <p className="text-sm">© {new Date().getFullYear()} Inventory System</p>
      </footer>
    </div>
  );
}

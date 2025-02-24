import { useRouter } from "next/router";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion"; // ✅ Import Framer Motion

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Add Stock */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg transition-all transform cursor-pointer"
            onClick={() => router.push("/stocks")}
            whileHover={{
              y: -4, // Slight lift
              scale: 1.1, // Grow effect
              opacity: 0.9, // Fade effect
              boxShadow: "0px 4px 20px rgba(59, 130, 246, 0.5)", // Blue glow
            }}
            transition={{ duration: 0.05, ease: "easeOut" }} // Super fast
          >
            <FaPlus className="text-blue-600 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center">Add Stock</h2>
          </motion.div>

          {/* View Stock */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg transition-all transform cursor-pointer"
            onClick={() => router.push("/view-stock")}
            whileHover={{
              y: -4,
              scale: 1.1,
              opacity: 0.9,
              boxShadow: "0px 4px 20px rgba(34, 197, 94, 0.5)", // Green glow
            }}
            transition={{ duration: 0.05, ease: "easeOut" }}
          >
            <FaEye className="text-green-600 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center">View Stock</h2>
          </motion.div>

          {/* Update Stock */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg transition-all transform cursor-pointer"
            onClick={() => router.push("/update-stock")}
            whileHover={{
              y: -4,
              scale: 1.1,
              opacity: 0.9,
              boxShadow: "0px 4px 20px rgba(234, 179, 8, 0.5)", // Yellow glow
            }}
            transition={{ duration: 0.05, ease: "easeOut" }}
          >
            <FaEdit className="text-yellow-600 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center">Update Stock</h2>
          </motion.div>

          {/* Delete Stock */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg transition-all transform cursor-pointer"
            onClick={() => router.push("/inventory-spent")}
            whileHover={{
              y: -4,
              scale: 1.1,
              opacity: 0.9,
              boxShadow: "0px 4px 20px rgba(220, 38, 38, 0.5)", // Red glow
            }}
            transition={{ duration: 0.05, ease: "easeOut" }}
          >
            <FaTrash className="text-red-600 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-center">Inventory Spent</h2>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-4 text-center fixed bottom-0 left-0">
        <p className="text-sm">© {new Date().getFullYear()} Inventory System</p>
      </footer>
    </div>
  );
}

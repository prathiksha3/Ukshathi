const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stockRoutes = require("./routes/stockRoutes"); // Import stock routes
const inventoryRoutes = require("./routes/inventoryRoutes"); // Import inventory routes
const db = require("./config/db"); // Import database connection

dotenv.config(); // ✅ Load environment variables

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// ✅ Test database connection before handling requests
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit server if DB fails
  }

  console.log("✅ Connected to MySQL!");
  
  db.query("SELECT DATABASE();", (err, result) => {
    if (!err) {
      console.log(`📂 Currently using database: ${result[0]["DATABASE()"]}`);
    }
  });

  // ✅ Mount routes *after* DB connection is established
  app.use("/api/stock", stockRoutes);
  app.use("/api/inventory-spent", inventoryRoutes);

  const PORT = process.env.PORT || 6000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});

import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import app from "./src/app.js"; // We will create app.js for better structure

dotenv.config();

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!", err);
    process.exit(1);
  });

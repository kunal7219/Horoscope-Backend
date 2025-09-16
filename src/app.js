import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

// Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Route Imports
import authRouter from "./api/auth.routes.js";
import horoscopeRouter from "./api/horoscope.routes.js";

// Route Declarations
app.get("/api/v1/health", (req, res) => res.send("Horoscope API is running!"));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/horoscope", horoscopeRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;

import { Router } from "express";
import { getTodaysHoroscope, getHoroscopeHistory } from "../controllers/horoscope.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { apiRateLimiter } from "../middlewares/rateLimiter.middleware.js";

const router = Router();

// Apply middleware to all routes in this file
router.use(authMiddleware);
router.use(apiRateLimiter);

router.get("/today", getTodaysHoroscope);
router.get("/history", getHoroscopeHistory);

export default router;

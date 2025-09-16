import { HoroscopeHistory } from "../models/horoscopeHistory.model.js";
import { getDailyHoroscope } from "../services/horoscope.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getTodaysHoroscope = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const zodiacSign = req.user.zodiacSign;

  // Get today's date at midnight UTC
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Check if history exists for today
  let todaysHistory = await HoroscopeHistory.findOne({ userId, date: today });

  if (todaysHistory) {
    return res.status(200).json(new ApiResponse(200, { horoscope: todaysHistory.horoscope, date: today }, "Horoscope retrieved from history"));
  }

  // If not, generate, save, and return
  const horoscopeText = getDailyHoroscope(zodiacSign, today);

  // Save to history (Bonus feature)
  await HoroscopeHistory.create({
    userId,
    date: today,
    zodiacSign,
    horoscope: horoscopeText,
  });

  return res.status(200).json(new ApiResponse(200, { horoscope: horoscopeText, date: today }, "Today's horoscope generated successfully"));
});

export const getHoroscopeHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Calculate the date 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setUTCHours(0, 0, 0, 0);

  const history = await HoroscopeHistory.find({
    userId,
    date: { $gte: sevenDaysAgo },
  }).sort({ date: -1 }); // Sort by most recent first

  if (!history) {
    throw new ApiError(404, "No history found for the last 7 days.");
  }

  return res.status(200).json(new ApiResponse(200, history, "Last 7 days of horoscope history retrieved successfully"));
});

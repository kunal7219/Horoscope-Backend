import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const horoscopesDataPath = path.join(__dirname, "..", "data", "horoscopes.json");
const horoscopes = JSON.parse(fs.readFileSync(horoscopesDataPath, "utf-8"));

/**
 * Gets a deterministic daily horoscope for a given zodiac sign.
 * @param {string} zodiacSign - The user's zodiac sign.
 * @param {Date} date - The date for the horoscope.
 * @returns {string} The horoscope text.
 */
export const getDailyHoroscope = (zodiacSign, date) => {
  const signHoroscopes = horoscopes[zodiacSign];
  if (!signHoroscopes || signHoroscopes.length === 0) {
    return "The stars are quiet today. Check back tomorrow for your horoscope.";
  }

  // Make the choice deterministic for the given day
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  const index = dayOfYear % signHoroscopes.length;

  return signHoroscopes[index];
};

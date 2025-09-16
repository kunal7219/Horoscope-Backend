import mongoose from "mongoose";

const horoscopeHistorySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    zodiacSign: { type: String, required: true },
    horoscope: { type: String, required: true },
  },
  { timestamps: true }
);

// Index for efficient querying of a user's history
horoscopeHistorySchema.index({ userId: 1, date: -1 });

export const HoroscopeHistory = mongoose.model("HoroscopeHistory", horoscopeHistorySchema);

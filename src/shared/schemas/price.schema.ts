import mongoose from 'mongoose';

const PriceHistorySchema = new mongoose.Schema(
  {
    current: Number,
    old: Number,
    history: [{ date: Date, value: Number }],
  },
  { _id: false, timestamps: true },
);

export const PriceSchema = new mongoose.Schema(
  {
    tnd: PriceHistorySchema,
    usd: PriceHistorySchema,
    eur: PriceHistorySchema,
  },
  { _id: false },
);

import mongoose from 'mongoose';

export const ShopsSchemaName = 'shops';
export const ShopsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  { timestamps: true },
);

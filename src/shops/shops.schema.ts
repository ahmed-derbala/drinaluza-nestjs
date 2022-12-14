import mongoose from 'mongoose';
import { LocationSchema } from 'src/shared/schemas/location.schema';

export const ShopsSchemaName = 'shops';
export const ShopsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    location: LocationSchema,
  },
  { timestamps: true },
);

import mongoose from 'mongoose';
import { LocationSchema } from 'src/shared/schemas/location.schema';

export const EnterprisesSchemaName = 'enterprises';
export const EnterprisesSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    location: LocationSchema,
  },
  { timestamps: true },
);

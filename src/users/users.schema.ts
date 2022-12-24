import mongoose from 'mongoose';
import { UserProfileSchema } from 'src/shared/schemas/user-profile.schema';

export const UsersSchemaName = 'users';
export const UsersSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    profile: { type: UserProfileSchema, select: false },
    password: { type: String, select: false },
  },
  { timestamps: true },
);

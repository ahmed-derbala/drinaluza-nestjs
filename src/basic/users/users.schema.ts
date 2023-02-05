import mongoose from 'mongoose';
import { Role } from '@roles/role.enum';
import { UserProfileSchema } from '@schemas/user-profile.schema';

export const usersSchemaName = 'users';
export const UsersSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    profile: { type: UserProfileSchema, select: false },
    password: { type: String, select: false },
    roles: {
      type: [String],
      required: true,
      enum: Object.values(Role),
    },
  },
  { timestamps: true },
);

export class User {
  username: string;
  email: string;
  // profile: { type: UserProfileSchema, select: false },
  password: string;
}

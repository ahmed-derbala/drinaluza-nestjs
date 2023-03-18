import mongoose from 'mongoose';
import { Role } from '@roles/role.enum';
import {
  UserProfile,
  UserProfileSchema,
} from '@core/shared-schemas/user-profile.schema';

export const usersSchemaName = 'users';
export const UsersSchema = new mongoose.Schema(
  {
    username: String,
    email: { unique: true, type: String },
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
  profile: UserProfile;
  password: string;
}

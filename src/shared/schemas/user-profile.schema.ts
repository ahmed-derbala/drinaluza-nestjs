import mongoose from 'mongoose';

export const UserProfileSchema = new mongoose.Schema(
  {
    firstname: String,
    middlename: String,
    lastname: String,
  },
  { _id: false, timestamps: true },
);

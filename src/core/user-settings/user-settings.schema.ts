import mongoose from 'mongoose';

export const UserSettingsSchema = new mongoose.Schema(
  {
    notifications: {
      enabled: {
        type: Boolean,
        default: true,
      },
      emails: {},
      sms: {},
    },
    middlename: String,
    lastname: String,
  },
  { _id: false, timestamps: true },
);

export class UserSettingsEntity {
  enabled: boolean;
  emails: any;
  sms: any;
}

import mongoose, { ObjectId } from 'mongoose';
import { usersSchemaName } from '@users/users.schema';
const priorities = ['low', 'medium', 'high'];

export const notificationsSchemaName = 'notifications';

export const NotificationsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: usersSchemaName,
      required: true,
    },
    isSeenAt: { default: null, type: Date },
    subject: { type: String, required: true },
    content: { type: String, required: true },
    priority: { type: String, required: true },
  },
  { timestamps: true },
);

export class NotificationsEntity {
  userId: ObjectId;
  isSeenAt: Date;
  subject: String;
  content: String;
  priority: String;
}

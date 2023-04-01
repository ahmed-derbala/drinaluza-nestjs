import mongoose from 'mongoose';
import { CreatedBySchema } from '@core/shared-schemas/created-by.schema';

export const PostsSchemaName = 'posts';
export const PostsSchema = new mongoose.Schema(
  {
    createdBy: CreatedBySchema,
    html: String,
    tags: [String],
  },
  { timestamps: true },
);

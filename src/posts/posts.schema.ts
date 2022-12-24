import mongoose from 'mongoose';
import { CreatorSchema } from 'src/shared/schemas/creator.schema';

export const PostsSchemaName = 'posts';
export const PostsSchema = new mongoose.Schema(
  {
    creator: CreatorSchema,
    html: String,
    tags: [String],
  },
  { timestamps: true },
);

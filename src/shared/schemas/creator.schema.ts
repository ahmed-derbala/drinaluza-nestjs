import mongoose from 'mongoose';

export const CreatorSchema = new mongoose.Schema(
  {
    kind: String,
    kindId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'kind',
    },
  },
  { _id: false },
);

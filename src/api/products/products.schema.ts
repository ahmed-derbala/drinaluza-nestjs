import mongoose from 'mongoose';
import { CreatorSchema } from '@schemas/creator.schema';
import { PriceSchema } from '@schemas/price.schema';
import { ShopsSchemaName } from '@shops/shops.schema';

export const ProductsSchemaName = 'products';
export const ProductsSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    creator: CreatorSchema,
    shopIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: ShopsSchemaName,
      },
    ],
    price: PriceSchema,
    tags: [String],
  },
  { timestamps: true },
);

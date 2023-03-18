import mongoose from 'mongoose';
import { CreatorSchema } from '@core/shared-schemas/creator.schema';
import { PriceSchema } from '@core/shared-schemas/price.schema';
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

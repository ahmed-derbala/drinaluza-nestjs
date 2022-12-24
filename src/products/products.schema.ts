import mongoose from 'mongoose';
import { EnterprisesSchemaName } from 'src/enterprises/enterprises.schema';
import { CreatorSchema } from 'src/shared/schemas/creator.schema';
import { PriceSchema } from 'src/shared/schemas/price.schema';
import { ShopsSchemaName } from 'src/shops/shops.schema';

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
    enterpriseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: EnterprisesSchemaName,
    },
    price: PriceSchema,
    tags: [String],
  },
  { timestamps: true },
);

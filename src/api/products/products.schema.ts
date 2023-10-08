import mongoose, { ObjectId } from 'mongoose';
import { CreatedBySchema } from '@core/schemas/created-by.schema';
import { PriceEntity, PriceSchema } from '@core/schemas/price.schema';
import { ShopsSchemaName } from '@shops/shops.schema';
import { usersSchemaName } from '@users/users.schema';

export const ProductsSchemaName = 'products';
export const ProductsSchema = new mongoose.Schema(
  {
    //createdBy: CreatedBySchema,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: usersSchemaName,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: ShopsSchemaName,
    },
    name: { type: String, required: true },
    price: PriceSchema,
    tags: [String],
  },
  { timestamps: true },
);

export class ProductsEntity {
  userId: ObjectId;
  shopId: ObjectId;
  name: string;
  price: PriceEntity;
  tags: [string];
}

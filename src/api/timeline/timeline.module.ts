import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { usersSchemaName, UsersSchema } from '@users/users.schema';
import { ShopsSchema, ShopsSchemaName } from '@shops/shops.schema';
import { ProductsSchema, ProductsSchemaName } from '@products/products.schema';

@Module({
  controllers: [TimelineController],
  providers: [TimelineService],
  imports: [
    MongooseModule.forFeature([
      { name: usersSchemaName, schema: UsersSchema },
      { name: ShopsSchemaName, schema: ShopsSchema },
      { name: ProductsSchemaName, schema: ProductsSchema },
    ]),
  ],
})
export class TimelineModule {}

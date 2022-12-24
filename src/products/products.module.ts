import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsSchema, ProductsSchemaName } from './products.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    MongooseModule.forFeature([
      { name: ProductsSchemaName, schema: ProductsSchema },
    ]),
  ],
})
export class ProductsModule {}

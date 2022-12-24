import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopsSchema, ShopsSchemaName } from './shops.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [
    MongooseModule.forFeature([{ name: ShopsSchemaName, schema: ShopsSchema }]),
  ],
})
export class ShopsModule {}

import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { EnterprisesSchema, EnterprisesSchemaName } from './enterprises.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
  imports: [
    MongooseModule.forFeature([
      { name: EnterprisesSchemaName, schema: EnterprisesSchema },
    ]),
  ],
})
export class EnterprisesModule {}

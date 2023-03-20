import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationsSchema,
  notificationsSchemaName,
} from './notifications.schema';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    MongooseModule.forFeature([
      { name: notificationsSchemaName, schema: NotificationsSchema },
    ]),
  ],
})
export class NotificationsModule {}

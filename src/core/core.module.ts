import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  controllers: [],
  providers: [],
  imports: [NotificationsModule],
})
export class CoreModule {}

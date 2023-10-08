import { Module } from '@nestjs/common';
import { NotificationsModule } from './notifications/notifications.module';
import { EmailsModule } from './emails/emails.module';
import { SmsModule } from './sms/sms.module';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { ErrorModule } from './error/error.module';
import { TranslationsModule } from './translations/translations.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    NotificationsModule,
    EmailsModule,
    SmsModule,
    UserSettingsModule,
    ErrorModule,
    TranslationsModule,
  ],
})
export class CoreModule {}

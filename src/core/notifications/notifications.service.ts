import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import {
  NotificationsEntity,
  notificationsSchemaName,
} from './notifications.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(notificationsSchemaName)
    private NotificationsModel: Model<NotificationsEntity>,
    private configService: ConfigService,
  ) {}

  create({ userIds, subject, content, sendType, sendAt }) {
    if (sendType === 'instant') {
      sendAt = Date.now();
    }
    let notificationsData = userIds.map((id) => {
      return { userId: id, subject, content, sendType, sendAt };
    });

    //save notifications to db
    this.NotificationsModel.insertMany(notificationsData);
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}

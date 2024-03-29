import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import conf from '@config/config';
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return `${JSON.stringify(conf().app)}`;
  }
}

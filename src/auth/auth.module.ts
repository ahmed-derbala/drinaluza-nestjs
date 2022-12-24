import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersSchema } from 'src/users/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthV1Controller } from './v1/auth.controller';
import { AuthV1Service } from './v1/auth.service';
@Module({
  controllers: [AuthController, AuthV1Controller],
  providers: [AuthService, AuthV1Service],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
})
export class AuthModule {}

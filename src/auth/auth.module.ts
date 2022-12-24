import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersSchema } from 'src/users/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthV1Controller } from './v1/auth.controller';
import { AuthV1Service } from './v1/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController, AuthV1Controller],
  providers: [AuthService, AuthV1Service, JwtStrategy],
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.jwt.secret'),
        signOptions: {
          expiresIn: configService.get('auth.jwt.signOptions.expiresIn'),
        },
      }),
    }),
  ],
})
export class AuthModule {}

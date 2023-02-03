import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@users/users.module';
import { AuthModule } from './core/auth/auth.module';
import { FilesModule } from '@files/files.module';
import { ShopsModule } from '@shops/shops.module';
import { ProductsModule } from '@products/products.module';
import { SearchModule } from '@search/search.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '@posts/posts.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MyLoggerMiddleware } from './core/my-logger/my-logger.middleware';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FilesModule,
    ShopsModule,
    ProductsModule,
    SearchModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('db.uri'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    PostsModule,
    CoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MyLoggerMiddleware).forRoutes('*');
  }
}

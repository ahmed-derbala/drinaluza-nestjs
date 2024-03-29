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
import config from './configs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from '@posts/posts.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MyLoggerMiddleware } from './core/my-logger/my-logger.middleware';
import { CoreModule } from './core/core.module';
import { TimelineModule } from './api/timeline/timeline.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    FilesModule,
    ShopsModule,
    ProductsModule,
    SearchModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('db.mongo.uri'),
        ...config().db.mongo.options,
      }),
    }),
    ThrottlerModule.forRoot(config().throttler),
    PostsModule,
    CoreModule,
    TimelineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MyLoggerMiddleware).forRoutes('*');
  }
}

import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema, PostsSchemaName } from './posts.schema';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    MongooseModule.forFeature([{ name: PostsSchemaName, schema: PostsSchema }]),
  ],
})
export class PostsModule {}

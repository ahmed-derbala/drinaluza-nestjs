import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { EnterprisesModule } from './enterprises/enterprises.module';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';
import { SearchModule } from './search/search.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [UsersModule, AuthModule, FilesModule, EnterprisesModule, ShopsModule, ProductsModule, SearchModule, ProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

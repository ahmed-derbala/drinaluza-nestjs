import { ConnectedUser } from '@core/auth/connected-user.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { authenticate } from 'passport';
import { CreateShopDto, ShopDto } from './shops.schema';
import { ShopsService } from './shops.service';

@UseGuards(AuthGuard('jwt'))
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  create(@Body() createShopDto: CreateShopDto, @ConnectedUser() connectedUser) {
    const shop: ShopDto = { ...createShopDto, userId: connectedUser._id };
    return this.shopsService.create(shop);
  }

  @Get()
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }
}

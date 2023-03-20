import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateShopDto,
  ShopDto,
  ShopsEntity,
  ShopsSchemaName,
} from './shops.schema';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(ShopsSchemaName)
    private ShopsModel: Model<ShopsEntity>,
  ) {}

  create(shopDto: ShopDto) {
    console.log(shopDto, 'shopDto');

    return this.ShopsModel.create(shopDto);
  }

  findAll() {
    return `This action returns all shops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateShopDto,
  ShopDto,
  ShopsEntity,
  ShopsSchemaName,
} from './shops.schema';
import { paginate } from '@core/pagination/mongoose.pagination';

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
    return paginate({ model: this.ShopsModel });
  }

  findOne(id: number) {
    return `This action returns a #${id} shop`;
  }

  remove(id: number) {
    return `This action removes a #${id} shop`;
  }
}

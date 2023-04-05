import { Injectable } from '@nestjs/common';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { InjectModel } from '@nestjs/mongoose';
import { usersSchemaName, UserEntity } from '@users/users.schema';
import { Model } from 'mongoose';
import { ShopDto, ShopsSchemaName } from '@shops/shops.schema';
import { ProductsSchemaName } from '@products/products.schema';
import { Product } from '@products/entities/product.entity';
import { aggregatePaginate } from '@pagination/mongoose.pagination';

@Injectable()
export class TimelineService {
  constructor(
    @InjectModel(usersSchemaName)
    private UsersModel: Model<UserEntity>,
    @InjectModel(ShopsSchemaName)
    private ShopsModel: Model<ShopDto>,
    @InjectModel(ProductsSchemaName)
    private ProductsModel: Model<Product>,
  ) {}
  create(createTimelineDto: CreateTimelineDto) {
    return 'This action adds a new timeline';
  }

  find() {
    const pipeline = [];
    return aggregatePaginate({
      limit: 1,
      page: 1,
      pipeline,
      model: this.UsersModel,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} timeline`;
  }

  update(id: number, updateTimelineDto: UpdateTimelineDto) {
    return `This action updates a #${id} timeline`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeline`;
  }
}

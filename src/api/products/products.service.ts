import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { paginate } from '@core/pagination/mongoose.pagination';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsEntity, ProductsSchemaName } from './products.schema';
import { ShopsEntity, ShopsSchemaName } from '@shops/shops.schema';
import { Model } from 'mongoose';
import errorHandler from '@core/error/error-handler';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(ShopsSchemaName)
    private ShopsModel: Model<ShopsEntity>,
    @InjectModel(ProductsSchemaName)
    private ProductsModel: Model<ProductsEntity>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    try {
      let x = await this.ProductsModel.create(createProductDto);
      return x;
    } catch (err) {
      return errorHandler({ err });
    }
  }

  findAll() {
    return paginate({ model: this.ProductsModel });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

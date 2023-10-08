import mongoose, {
  isObjectIdOrHexString,
  isValidObjectId,
  ObjectId,
} from 'mongoose';
import { LocationSchema } from '@core/schemas/location.schema';
import { usersSchemaName } from '@users/users.schema';
import { IsEmail, isEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const ShopsSchemaName = 'shops';
export const ShopsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: usersSchemaName,
      required: true,
    },
    name: String,
    email: { unique: true, type: String, required: true },
    location: LocationSchema,
  },
  { timestamps: true },
);

export class ShopDto {
  @IsNotEmpty()
  @ApiProperty({
    type: isValidObjectId,
    description: '_id',
  })
  public userId: ObjectId;

  @IsEmail()
  @ApiProperty({
    type: isEmail,
    description: 'email',
  })
  public email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'name of shop',
  })
  public name: string;
}

export class CreateShopDto {
  /* @IsNotEmpty()
  @ApiProperty({
    type: isObjectIdOrHexString,
    description: '_id',
  })
  public userId: ObjectId;
*/
  @IsEmail()
  @ApiProperty({
    type: isEmail,
    description: 'email',
  })
  public email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'name of shop',
  })
  public name: string;
}

export class ShopsEntity {
  userId: ObjectId;
  name: string;
  email: string;
}

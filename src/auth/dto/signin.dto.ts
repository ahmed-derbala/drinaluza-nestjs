import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class signinDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: 'password',
  })
  password: string;
}

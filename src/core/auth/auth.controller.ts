import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  Version,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { signupDto } from './dto/signup.dto';
import { signinDto } from './dto/signin.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '@jwt/jwt-auth.guard';
import { HttpRestType } from '@mytypes/http-rest.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async signup(@Body() signupDto: signupDto): Promise<HttpRestType> {
    const createdUser = await this.authService.signup(signupDto);
    const result: HttpRestType = {
      pagination: null,
      data: createdUser,
      error: false,
      message: 'succes',
    };
    return result;
  }

  @Post('/signin')
  signin(@Body() signinDto: signinDto) {
    return this.authService.signin(signinDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('a')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

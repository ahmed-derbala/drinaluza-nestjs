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
} from '@nestjs/common';
import { AuthV1Service } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthV1Controller {
  constructor(private readonly authService: AuthV1Service) {}
  @Post('/signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    console.log('v1');
    return 'v1';
    //return this.authService.signup(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
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

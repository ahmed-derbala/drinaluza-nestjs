import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { signupDto } from './dto/signup.dto';
import { signinDto } from './dto/signin.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users')
    private UsersModel: Model<any>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  signup(signupDto: signupDto) {
    let userToCreate: any = signupDto;
    const salt = bcrypt.genSaltSync(this.configService.get('auth.saltRounds'));
    userToCreate.password = bcrypt.hashSync(signupDto.password, salt);
    return this.UsersModel.create(userToCreate);
  }

  async signin(signinDto: signinDto) {
    const user = await this.UsersModel.findOne({ email: signinDto.email })
      .lean()
      .select('+password');
    if (!user) throw NotFoundException;

    //user found, check password
    const passwordCompare = bcrypt.compareSync(
      signinDto.password,
      user.password,
    );
    delete user.password; //we dont need password anymore

    if (passwordCompare == false) {
      throw UnauthorizedException;
    }

    return { access_token: this.jwtService.sign(user) };
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

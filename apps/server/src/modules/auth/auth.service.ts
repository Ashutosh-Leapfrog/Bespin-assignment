import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';

import ENV_CONSTANTS from '@/constants/env.constants';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import LoginReqDto from './dto/login-req.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(data: LoginReqDto) {
    const user = await this.validateUser(data);

    const payload = {
      username: user.email,
      userId: user.id,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get(ENV_CONSTANTS.JWT.REFRESH_SECRET),
        expiresIn: this.configService.get(ENV_CONSTANTS.JWT.REFRESH_EXPIRES_IN),
      }),
    };
  }

  async validateUser(data: LoginReqDto) {
    const user = await this.userService.findByEmail(data.username);

    if (!user) {
      throw new BadRequestException('Email or password is invalid');
    }

    const isPasswordValid = await argon2.verify(user.password, data.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Email or password is invalid');
    }

    return user;
  }

  async register(data: CreateUserDto) {
    return this.userService.create(data);
  }
}

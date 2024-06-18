import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import LoginReqDto from './dto/login-req.dto';
import LocalGuard from './auth.local.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import CustomRequest from '@/interfaces/custom.request';
import JwtGuard from './auth.jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.authService.register(createUserDto);

      return user;
    } catch (error) {
      return error;
    }
  }

  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Body() data: LoginReqDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  async me(@Request() req: CustomRequest) {
    const { userId } = req.user;
    return await this.authService.verifyUser(userId);
  }
}

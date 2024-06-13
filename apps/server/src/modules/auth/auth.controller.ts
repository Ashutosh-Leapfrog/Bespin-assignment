import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginReqDto from './dto/login-req.dto';
import LocalGuard from './auth.local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Body() data: LoginReqDto) {
    return this.authService.login(data);
  }
}

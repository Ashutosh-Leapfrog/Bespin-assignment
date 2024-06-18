import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';

import JwtGuard from '../auth/auth.jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import CustomRequest from '@/interfaces/custom.request';
import UserResponseDto from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  findAll(@Request() req: CustomRequest) {
    const { userId } = req.user;
    return this.userService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: UserResponseDto = await this.userService.findOne(+id);
    return user;
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

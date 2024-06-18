import argon2 from 'argon2';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import UserRepo from './user.repo';
import User from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserResponseDto from './dto/get-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepo) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepo.getUserByEmail(createUserDto.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await argon2.hash(createUserDto.password);
    createUserDto.password = hashedPassword;
    const user = plainToClass(User, createUserDto);

    const [newUser] = await this.userRepo.addUser(user);

    return plainToClass(UserResponseDto, newUser);
  }

  async findAll(userId: number) {
    const users = await this.userRepo.getUsers();
    const filteredUsers = users.filter((user) => user.id !== userId);
    return filteredUsers.map((user) => plainToClass(UserResponseDto, user));
  }

  async findOne(id: number) {
    const [data] = await this.userRepo.getUserById(id);

    if (!data) {
      throw new NotFoundException('User not found');
    }

    const response = plainToClass(UserResponseDto, data);

    return response;
  }

  async findByEmail(email: string) {
    const data = await this.userRepo.getUserByEmail(email);

    if (!data) {
      throw new NotFoundException('User not found');
    }

    return data;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const [existingUser] = await this.userRepo.getUserById(id);
    const { password } = updateUserDto;

    if (password) {
      updateUserDto.password = await argon2.hash(password);
    }

    updateUserDto.password = existingUser.password;

    const user = plainToClass(User, updateUserDto);
    return this.userRepo.updateUser(id, user);
  }

  remove(id: number) {
    return this.userRepo.deleteUser(id);
  }
}

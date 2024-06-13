import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import JwtGuard from './auth.jwt.guard';
import LocalGuard from './auth.local.guard';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './auth.jwt.strategy';
import LocalStrategy from './auth.local.strategy';
import { AuthController } from './auth.controller';
import ENV_CONSTANTS from '@/constants/env.constants';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LocalGuard,
    JwtGuard,
    ConfigService,
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(ENV_CONSTANTS.JWT.ACCESS_SECRET),
        signOptions: {
          expiresIn: configService.get(ENV_CONSTANTS.JWT.ACCESS_EXPIRES_IN),
        },
      }),
    }),
  ],
})
export class AuthModule {}

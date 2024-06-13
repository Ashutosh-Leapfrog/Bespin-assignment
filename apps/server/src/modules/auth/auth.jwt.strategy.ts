import ENV_CONSTANTS from '@/constants/env.constants';
import JwtPayload from '@/interfaces/jwt.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(ENV_CONSTANTS.JWT.ACCESS_SECRET),
    });
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.userId, username: payload.username };
  }
}

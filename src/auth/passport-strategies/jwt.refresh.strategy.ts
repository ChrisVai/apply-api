import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import * as process from 'node:process';
import { Request } from 'express';
import { extractRefreshTokenFromCookies } from '../../cookies/cookieConfig';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractRefreshTokenFromCookies(req),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }
  async validate(payload) {
    const authUser = await this.userService.findOne(payload.sub);
    if (!authUser) {
      throw new UnauthorizedException();
    }
    return {
      attributes: authUser,
      refreshTokenExpiresAt: new Date(payload.exp * 1000),
    };
  }
}

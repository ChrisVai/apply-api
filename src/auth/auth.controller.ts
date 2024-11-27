import {
  Controller,
  InternalServerErrorException,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './services/auth-service/auth.service';
import { Public } from './decorators/public-decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthRefreshTokenService } from './services/auth-refresh-token-service/auth-refresh-token.service';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Response } from 'express';
import {
  cookieConfig,
  extractRefreshTokenFromCookies,
} from '../cookies/cookieConfig';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private authRefreshTokenService: AuthRefreshTokenService,
  ) {}

  @Throttle({
    short: { limit: 2, ttl: 1000 },
    long: { limit: 5, ttl: 60000 },
  })
  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    console.log('la requête arrivée dans login', req.body);
    return this.authService.login(res, req.body);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }

  @Throttle({
    short: { limit: 2, ttl: 1000 },
    long: { limit: 5, ttl: 60000 },
  })
  @ApiBearerAuth()
  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-tokens')
  refreshTokens(@Request() req, @Res({ passthrough: true }) res: Response) {
    if (!req.user) {
      throw new InternalServerErrorException();
    }
    return this.authRefreshTokenService.generateTokenPair(
      (req.user as any).attributes,
      res,
      extractRefreshTokenFromCookies(req) as string,
      (req.user as any).refreshTokenExpiresAt,
    );
  }
  @Public()
  @Post('clear-auth-cookie')
  clearAuthCookie(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(cookieConfig.refreshToken.name);
  }
}

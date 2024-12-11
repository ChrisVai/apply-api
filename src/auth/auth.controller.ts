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
import { Throttle } from '@nestjs/throttler';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthRefreshTokenService } from './services/auth-refresh-token-service/auth-refresh-token.service';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { Response } from 'express';
import {
  cookieConfig,
  extractRefreshTokenFromCookies,
} from '../cookies/cookieConfig';
import { UserLoginDto } from '../users/dto/user-login.dto';
import { User } from '../users/entities/user.entity';

@ApiTags('Auth')
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
  @ApiBody({ type: UserLoginDto })
  @Public()
  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(res, req.body);
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
    if (!req.body) {
      throw new InternalServerErrorException();
    }
    return this.authRefreshTokenService.generateTokenPair(
      req.body as User,
      res,
      extractRefreshTokenFromCookies(req) as string,
    );
  }
  @Public()
  @Post('clear-auth-cookie')
  clearAuthCookie(@Res({ passthrough: true }) res: Response) {
    console.log('passage dans clear auth cookie');
    res.clearCookie(cookieConfig.refreshToken.name);
  }
}

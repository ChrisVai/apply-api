import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRefreshToken } from '../../entities/auth-refresh-token.entity';
import { Repository } from 'typeorm';
import * as process from 'node:process';
import { User } from '../../../users/entities/user.entity';

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(AuthRefreshToken)
    private authRefreshTokenRepository: Repository<AuthRefreshToken>,
  ) {}

  async generateRefreshToken(
    authUserId: number,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const payload = { sub: authUserId };
    const newRefreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });
    if (currentRefreshToken && currentRefreshTokenExpiresAt) {
      if (
        await this.isRefreshTokenBlacklisted(currentRefreshToken, authUserId)
      ) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      await this.authRefreshTokenRepository.insert({
        refreshToken: currentRefreshToken,
        expiresAt: currentRefreshTokenExpiresAt,
        userId: authUserId,
      });
    }
    return newRefreshToken;
  }

  private isRefreshTokenBlacklisted(refreshToken: string, userId: number) {
    return this.authRefreshTokenRepository.existsBy({ refreshToken, userId });
  }

  async generateTokenPair(
    user: User,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
      refresh_token: await this.generateRefreshToken(
        user.id,
        currentRefreshToken,
        currentRefreshTokenExpiresAt,
      ),
    };
  }
}

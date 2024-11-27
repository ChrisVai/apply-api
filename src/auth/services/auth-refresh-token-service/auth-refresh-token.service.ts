import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRefreshToken } from '../../entities/auth-refresh-token.entity';
import { Repository } from 'typeorm';
import * as process from 'node:process';
import { User } from '../../../users/entities/user.entity';
import { HashService } from '../../hash/hash.service';
import { Response } from 'express';
import { cookieConfig } from '../../../cookies/cookieConfig';

@Injectable()
export class AuthRefreshTokenService {
  constructor(
    private jwtService: JwtService,
    private hashService: HashService,
    @InjectRepository(AuthRefreshToken)
    private authRefreshTokenRepository: Repository<AuthRefreshToken>,
  ) {}

  async generateRefreshToken(
    authUser: User,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const payload = { sub: authUser.id };
    const newRefreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });
    if (currentRefreshToken && currentRefreshTokenExpiresAt) {
      const hashedRefreshToken =
        await this.hashService.hash(currentRefreshToken);
      if (
        await this.isRefreshTokenBlacklisted(hashedRefreshToken, authUser.id)
      ) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      await this.authRefreshTokenRepository.insert({
        hashedRefreshToken,
        expiresAt: currentRefreshTokenExpiresAt,
        userId: authUser.id,
      });
    }
    return newRefreshToken;
  }

  private isRefreshTokenBlacklisted(
    hashedRefreshToken: string,
    userId: number,
  ) {
    return this.authRefreshTokenRepository.existsBy({
      hashedRefreshToken,
      userId,
    });
  }

  async generateTokenPair(
    user: User,
    res: Response,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const payload = { sub: user.id };
    res.cookie(
      cookieConfig.refreshToken.name,
      await this.generateRefreshToken(
        user,
        currentRefreshToken,
        currentRefreshTokenExpiresAt,
      ),
      {
        ...cookieConfig.refreshToken.options,
      },
    );
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}

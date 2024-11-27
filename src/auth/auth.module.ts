import { Module } from '@nestjs/common';
import { AuthService } from './services/auth-service/auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport-strategies/local.strategy';
import { UsersService } from '../users/users.service';
import { HashService } from './hash/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { AuthRefreshTokenService } from './services/auth-refresh-token-service/auth-refresh-token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRefreshToken } from './entities/auth-refresh-token.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([AuthRefreshToken]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    HashService,
    ConfigService,
    AuthRefreshTokenService,
  ],
  controllers: [AuthController],
  exports: [AuthService, TypeOrmModule],
})
export class AuthModule {}

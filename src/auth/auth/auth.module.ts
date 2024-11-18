import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../local.strategy';
import { UsersService } from '../../users/users.service';
import { HashService } from '../hash/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UsersService,
    HashService,
    ConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}

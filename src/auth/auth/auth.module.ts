import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../../users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../local.strategy';
import { UsersService } from '../../users/users.service';
import { HashService } from '../hash/hash.service';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, UsersService, HashService],
  controllers: [AuthController],
})
export class AuthModule {}

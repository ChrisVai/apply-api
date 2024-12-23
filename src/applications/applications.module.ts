import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { HashService } from '../auth/hash/hash.service';

@Module({
  imports: [TypeOrmModule.forFeature([Application, User])],
  controllers: [ApplicationsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ApplicationsService,
    UsersService,
    HashService,
  ],
  exports: [TypeOrmModule],
})
export class ApplicationsModule {}

import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ApplicationsService,
  ],
  exports: [TypeOrmModule],
})
export class ApplicationsModule {}

import { Module } from '@nestjs/common';
import { RecruitersService } from './recruiters.service';
import { RecruitersController } from './recruiters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recruiter])],
  controllers: [RecruitersController],
  providers: [RecruitersService],
  exports: [TypeOrmModule],
})
export class RecruitersModule {}

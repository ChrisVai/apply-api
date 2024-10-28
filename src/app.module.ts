import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ApplicationsModule } from './applications/applications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruitersModule } from './recruiters/recruiters.module';
import { ApplicationsController } from './applications/applications.controller';
import { UsersController } from './users/users.controller';
import { RecruitersController } from './recruiters/recruiters.controller';
import { ApplicationsService } from './applications/applications.service';
import { UsersService } from './users/users.service';
import { RecruitersService } from './recruiters/recruiters.service';
import { CompaniesModule } from './companies/companies.module';
import { Application } from './applications/entities/application.entity';
import { Company } from './companies/entities/company.entity';
import { Recruiter } from './recruiters/entities/recruiter.entity';
import { User } from './users/entities/user.entity';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesService } from './companies/companies.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3060,
      username: 'chris',
      password: 'Ferrari-458',
      database: 'apply_db',
      entities: [Application, Company, Recruiter, User],
      synchronize: true,
    }),
    UsersModule,
    ApplicationsModule,
    RecruitersModule,
    CompaniesModule,
  ],
  controllers: [
    ApplicationsController,
    UsersController,
    RecruitersController,
    CompaniesController,
  ],
  providers: [
    ApplicationsService,
    UsersService,
    RecruitersService,
    CompaniesService,
  ],
})
export class AppModule {}

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
import { HashService } from './auth/hash/hash.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/services/auth-service/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthRefreshTokenService } from './auth/services/auth-refresh-token-service/auth-refresh-token.service';
import { AuthRefreshToken } from './auth/entities/auth-refresh-token.entity';
import { SectorsModule } from './sectors/sectors.module';
import { Sector } from './sectors/entities/sector.entity';
import { SectorsController } from './sectors/sectors.controller';
import { SectorsService } from './sectors/sectors.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3060,
      username: 'chris',
      password: 'Ferrari-458',
      database: 'apply_db',
      entities: [
        Application,
        Company,
        Recruiter,
        User,
        AuthRefreshToken,
        Sector,
      ],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ApplicationsModule,
    RecruitersModule,
    CompaniesModule,
    AuthModule,
    JwtModule,
    SectorsModule,
  ],
  controllers: [
    ApplicationsController,
    UsersController,
    RecruitersController,
    CompaniesController,
    AuthController,
    SectorsController,
  ],
  providers: [
    ApplicationsService,
    UsersService,
    RecruitersService,
    CompaniesService,
    HashService,
    AuthService,
    JwtService,
    AuthRefreshTokenService,
    SectorsService,
  ],
})
export class AppModule {}

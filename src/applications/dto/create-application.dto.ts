import { RecruiterResponse, Status } from '../model/applicationModel';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';

export class CreateApplicationDto {
  @IsUrl()
  @IsOptional()
  offerUrl?: string;

  @IsOptional()
  title: string;

  @IsOptional()
  category: string;

  @IsBoolean()
  @IsOptional()
  applied?: boolean;

  @IsDateString()
  @IsOptional()
  appliedOn?: Date;

  @IsOptional()
  recruiterResponse?: RecruiterResponse;

  @IsOptional()
  comments?: string;

  @IsOptional()
  status?: Status;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  company: Company;
}

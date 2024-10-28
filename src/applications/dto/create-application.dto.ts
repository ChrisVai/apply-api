import { RecruiterResponse, Status } from '../model/applicationModel';
import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  offerUrl?: string;

  @IsBoolean()
  applied?: boolean;

  @IsDate()
  appliedOn?: Date;

  recruiterResponse?: RecruiterResponse;

  status?: Status;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  company: Company;
}

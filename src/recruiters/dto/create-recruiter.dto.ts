import { IsEmail, IsString, IsUrl } from 'class-validator';
import { Company } from '../../companies/entities/company.entity';

export class CreateRecruiterDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsEmail()
  email: string;

  @IsUrl()
  linkedInUrl?: string;

  companies: Company[];
}

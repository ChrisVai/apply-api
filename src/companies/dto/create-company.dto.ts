import { IsNotEmpty, IsString } from 'class-validator';
import { Recruiter } from '../../recruiters/entities/recruiter.entity';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  websiteUrl?: string;

  @IsString()
  postalAddress?: string;

  @IsString()
  emailContactAddress?: string;

  recruiters?: Recruiter[];
}

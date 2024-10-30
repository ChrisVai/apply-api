import { RecruiterResponse, Status } from '../model/applicationModel';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateApplicationDto {
  @IsUrl()
  @IsOptional()
  offerUrl?: string;

  @IsBoolean()
  @IsOptional()
  applied?: boolean;

  @IsDateString()
  @IsOptional()
  appliedOn?: Date;

  @IsOptional()
  recruiterResponse?: RecruiterResponse;

  @IsOptional()
  status?: Status;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  companyId: number;
}

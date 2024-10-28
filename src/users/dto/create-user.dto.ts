import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Application } from '../../applications/entities/application.entity';

export class CreateUserDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  applications?: Application[];
}

import { UserModel } from '../model/userModel';
import { ApplicationModel } from '../../applications/model/applicationModel';

export class CreateUserDto implements UserModel {
  applications?: ApplicationModel[];
  email: string;
  firstName?: string;
  id: number;
  lastName?: string;
  password: string;
}

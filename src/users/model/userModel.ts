import { ApplicationModel } from '../../applications/model/applicationModel';

export interface UserModel {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  applications?: ApplicationModel[];
}

import {
  ApplicationModel,
  RecruiterResponse,
  Status,
} from '../model/applicationModel';
import { User } from '../../users/entities/user.entity';

export class CreateApplicationDto implements ApplicationModel {
  id: number;
  CompanyName: string;
  offerUrl?: string;
  applied: boolean;
  appliedOn: Date;
  recruiterResponse?: RecruiterResponse;
  status: Status;
  user: User;
}

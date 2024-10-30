import { User } from '../../users/entities/user.entity';
import { Company } from '../../companies/entities/company.entity';

export enum RecruiterResponse {
  no = 'Négative',
  yes = 'Positive',
  none = 'Aucune',
}
export enum Status {
  toApply = 'A postuler',
  applied = 'Postulé',
  toRelaunch = 'A relancer',
  relaunched = 'Relancé',
  closed = 'Close',
}
export interface ApplicationModel {
  id: number;
  Company: Company;
  offerUrl?: string;
  applied: boolean;
  appliedOn?: Date;
  recruiterResponse?: RecruiterResponse;
  status: Status;
  user: User;
}

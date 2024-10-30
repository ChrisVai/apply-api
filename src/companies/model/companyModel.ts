import { ApplicationModel } from '../../applications/model/applicationModel';
import { RecruiterModel } from '../../recruiters/model/recruiterModel';

export interface CompanyModel {
  id: number;
  name: string;
  websiteUrl?: string;
  postalAddress?: string;
  emailContactAddress?: string;
  applications: ApplicationModel[];
  recruiters: RecruiterModel[];
}

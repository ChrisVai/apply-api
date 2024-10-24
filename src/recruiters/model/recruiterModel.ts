import { CompanyModel } from '../../companies/model/companyModel';

export interface RecruiterModel {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedInUrl?: string;
  companies: CompanyModel[];
}

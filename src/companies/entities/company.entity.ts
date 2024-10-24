import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyModel } from '../model/companyModel';
import { ApplicationModel } from '../../applications/model/applicationModel';
import { RecruiterModel } from '../../recruiters/model/recruiterModel';
import { Recruiter } from '../../recruiters/entities/recruiter.entity';
import { Application } from '../../applications/entities/application.entity';

@Entity()
export class Company implements CompanyModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  websiteUrl: string;

  @Column({ nullable: true })
  postalAddress: string;

  @Column({ nullable: true })
  emailContactAddress: string;

  @ManyToMany(() => Recruiter, (recruiter: Recruiter) => recruiter.companies)
  @JoinTable()
  recruiters: RecruiterModel[];

  @OneToMany(
    () => Application,
    (application: Application) => application.Company,
  )
  applications: ApplicationModel[];
}

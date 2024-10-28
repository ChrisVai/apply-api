import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recruiter } from '../../recruiters/entities/recruiter.entity';
import { Application } from '../../applications/entities/application.entity';

@Entity()
export class Company {
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
  recruiters: Recruiter[];

  @OneToMany(
    () => Application,
    (application: Application) => application.company,
  )
  applications: Application[];
}

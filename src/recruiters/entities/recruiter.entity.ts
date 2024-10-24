import { RecruiterModel } from '../model/recruiterModel';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
@Entity()
export class Recruiter implements RecruiterModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  linkedInUrl: string;

  @ManyToMany(() => Company, (company: Company) => company.recruiters)
  companies: [];
}

import {
  ApplicationModel,
  RecruiterResponse,
  Status,
} from '../model/applicationModel';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
@Entity()
export class Application implements ApplicationModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.applications)
  Company: Company;

  @Column({ nullable: true })
  offerUrl: string;

  @Column({ default: false })
  applied: boolean;

  @Column({
    type: Date,
    nullable: true,
  })
  appliedOn: Date;

  @Column({
    type: 'enum',
    enum: RecruiterResponse,
    default: RecruiterResponse.none,
  })
  recruiterResponse: RecruiterResponse;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.toApply,
  })
  status: Status;

  @ManyToOne(() => User, (user: User) => user.applications)
  user: User;
}

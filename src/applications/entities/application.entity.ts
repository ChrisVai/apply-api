import { RecruiterResponse, Status } from '../model/applicationModel';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { Sector } from '../../sectors/entities/sector.entity';
@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => Sector, (sector) => sector.applications)
  sector: Sector;

  @ManyToOne(() => Company, (company) => company.applications)
  company: Company;

  @Column({ nullable: true })
  offerUrl: string;

  @Column({ default: false })
  applied: boolean;

  @Column({
    type: 'datetime',
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

  @Column({ nullable: true })
  comments: string;
}

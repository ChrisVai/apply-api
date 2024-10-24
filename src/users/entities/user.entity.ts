import { UserModel } from '../model/userModel';
import { ApplicationModel } from '../../applications/model/applicationModel';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from '../../applications/entities/application.entity';
@Entity()
export class User implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Application, (application: Application) => application.user)
  applications: ApplicationModel[];
}

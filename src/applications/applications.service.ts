import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { UserModel } from '../users/model/userModel';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}
  create(createApplicationDto: CreateApplicationDto) {
    return this.applicationRepository.save(createApplicationDto);
  }

  findAll() {
    return this.applicationRepository.find({
      relations: ['company'],
    });
  }

  findUserApplications(user: UserModel) {
    return this.applicationRepository.find({
      where: {
        user: user,
      },
      relations: {
        company: true,
      },
    });
  }

  findOne(id: number) {
    return this.applicationRepository.findOneBy({ id: id });
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return this.applicationRepository.update(+id, updateApplicationDto);
  }

  remove(id: number) {
    return this.applicationRepository.delete(id);
  }
}

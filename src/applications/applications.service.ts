import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}
  create(createApplicationDto: CreateApplicationDto) {
    const application: Application = new Application();

    application.user = createApplicationDto.user;
    application.company = createApplicationDto.company;

    if (createApplicationDto.offerUrl) {
      application.offerUrl = createApplicationDto.offerUrl;
    }
    if (createApplicationDto.applied) {
      application.applied = createApplicationDto.applied;
    }
    if (createApplicationDto.appliedOn) {
      application.appliedOn = createApplicationDto.appliedOn;
    }
    return this.applicationRepository.create(application);
  }

  findAll() {
    return `This action returns all applications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} application`;
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    const application = new Application();
    if (updateApplicationDto.user) {
      application.user = updateApplicationDto.user;
    }
    if (updateApplicationDto.company) {
      application.company = updateApplicationDto.company;
    }
    if (updateApplicationDto.offerUrl) {
      application.offerUrl = updateApplicationDto.offerUrl;
    }
    if (updateApplicationDto.applied) {
      application.applied = updateApplicationDto.applied;
    }
    if (updateApplicationDto.appliedOn) {
      application.appliedOn = updateApplicationDto.appliedOn;
    }
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}

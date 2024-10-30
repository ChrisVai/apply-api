import { Injectable } from '@nestjs/common';
import { CreateRecruiterDto } from './dto/create-recruiter.dto';
import { UpdateRecruiterDto } from './dto/update-recruiter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Recruiter } from './entities/recruiter.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecruitersService {
  constructor(
    @InjectRepository(Recruiter)
    private readonly recruiterRepository: Repository<Recruiter>,
  ) {}
  create(createRecruiterDto: CreateRecruiterDto) {
    return this.recruiterRepository.save(createRecruiterDto);
  }

  findAll() {
    return this.recruiterRepository.find();
  }

  findOne(id: number) {
    return this.recruiterRepository.findOneBy({ id });
  }

  update(id: number, updateRecruiterDto: UpdateRecruiterDto) {
    return this.recruiterRepository.save(updateRecruiterDto);
  }

  remove(id: number) {
    return this.recruiterRepository.delete(id);
  }
}

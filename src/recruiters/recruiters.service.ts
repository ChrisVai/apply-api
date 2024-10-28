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
    const recruiter = new Recruiter();
    if (createRecruiterDto.firstName) {
      recruiter.firstName = createRecruiterDto.firstName;
    }
    if (createRecruiterDto.lastName) {
      recruiter.lastName = createRecruiterDto.lastName;
    }
    if (createRecruiterDto.linkedInUrl) {
      recruiter.linkedInUrl = createRecruiterDto.linkedInUrl;
    }
    recruiter.companies = createRecruiterDto.companies;
    recruiter.email = createRecruiterDto.email;
    return this.recruiterRepository.save(createRecruiterDto);
  }

  findAll() {
    return this.recruiterRepository.find();
  }

  findOne(id: number) {
    return this.recruiterRepository.findOneBy({ id });
  }

  update(id: number, updateRecruiterDto: UpdateRecruiterDto) {
    const recruiter = new Recruiter();
    if (updateRecruiterDto.firstName) {
      recruiter.firstName = updateRecruiterDto.firstName;
    }
    if (updateRecruiterDto.lastName) {
      recruiter.lastName = updateRecruiterDto.lastName;
    }
    if (updateRecruiterDto.linkedInUrl) {
      recruiter.linkedInUrl = updateRecruiterDto.linkedInUrl;
    }
    if (recruiter.companies.length > 0) {
      for (const company of recruiter.companies) {
        recruiter.companies.push(company);
      }
    }

    recruiter.email = updateRecruiterDto.email;
    return this.recruiterRepository.save(updateRecruiterDto);
  }

  remove(id: number) {
    return this.recruiterRepository.delete(id);
  }
}

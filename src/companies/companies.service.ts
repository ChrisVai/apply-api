import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    const company: Company = new Company();

    company.name = createCompanyDto.name;

    if (createCompanyDto.websiteUrl) {
      company.websiteUrl = createCompanyDto.websiteUrl;
    }
    if (createCompanyDto.postalAddress) {
      company.postalAddress = createCompanyDto.postalAddress;
    }
    if (createCompanyDto.emailContactAddress) {
      company.emailContactAddress = createCompanyDto.emailContactAddress;
    }
    if (createCompanyDto.recruiters) {
      company.recruiters = createCompanyDto.recruiters;
    } else {
      company.recruiters = [];
    }

    return this.companyRepository.create(company);
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = new Company();
    if (updateCompanyDto.name) {
      company.name = updateCompanyDto.name;
    }
    if (updateCompanyDto.websiteUrl) {
      company.websiteUrl = updateCompanyDto.websiteUrl;
    }
    if (updateCompanyDto.postalAddress) {
      company.postalAddress = updateCompanyDto.postalAddress;
    }
    if (updateCompanyDto.emailContactAddress) {
      company.emailContactAddress = updateCompanyDto.postalAddress;
    }
    if (updateCompanyDto.recruiters) {
      for (const recruiter of updateCompanyDto.recruiters) {
        company.recruiters.push(recruiter);
      }
    }
    return this.companyRepository.update(id, company);
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}

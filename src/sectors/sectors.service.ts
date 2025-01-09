import { Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
  ) {}
  create(createSectorDto: CreateSectorDto) {
    return this.sectorRepository.save(createSectorDto);
  }

  findAll() {
    return this.sectorRepository.find();
  }

  findOne(id: number) {
    return this.sectorRepository.findOneBy({ id: id });
  }

  update(id: number, updateSectorDto: UpdateSectorDto) {
    return this.sectorRepository.update(id, updateSectorDto);
  }

  remove(id: number) {
    return this.sectorRepository.delete(id);
  }
}

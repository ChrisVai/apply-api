import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashService } from '../auth/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject()
    private hashService: HashService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.hashService.hashPassword(
      createUserDto.password,
    );
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    if (id && typeof id === 'number') {
      return this.usersRepository.findOne({
        where: {
          id: id,
        },
      });
    } else {
      return null;
    }
  }

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}

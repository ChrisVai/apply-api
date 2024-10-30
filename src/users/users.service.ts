import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const user: User = new User();

    user.email = createUserDto.email;
    user.password = createUserDto.password;

    if (createUserDto.firstName) {
      user.firstName = createUserDto.firstName;
    }
    if (createUserDto.lastName) {
      user.lastName = createUserDto.lastName;
    }

    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = new User();
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.email) {
      user.password = updateUserDto.password;
    }

    return this.usersRepository.update(id, user);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}

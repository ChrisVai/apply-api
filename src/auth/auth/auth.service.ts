import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { HashService } from '../hash/hash.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private userService: UsersService,
    private hashService: HashService,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.findOneByEmail(email);
    const isMatch: Promise<boolean> = this.hashService.compareHashedPassword(
      user.password,
      password,
    );
    if (user && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}

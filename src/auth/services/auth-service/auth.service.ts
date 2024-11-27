import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../../users/users.service';
import { HashService } from '../../hash/hash.service';
import { User } from '../../../users/entities/user.entity';
import { AuthRefreshTokenService } from '../auth-refresh-token-service/auth-refresh-token.service';
import { UserLoginDto } from '../../../users/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject()
    private userService: UsersService,
    private hashService: HashService,
    private authRefreshTokenService: AuthRefreshTokenService,
  ) {}

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.findOneByEmail(email);

    if (user) {
      const isPassMatch: boolean = await this.hashService.compareHashedPassword(
        password,
        user.password,
      );
      if (user && isPassMatch) {
        return user;
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(user: UserLoginDto) {
    const fullUser: User = await this.validateUser(user.email, user.password);

    if (fullUser) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = fullUser;
      return {
        tokens: await this.authRefreshTokenService.generateTokenPair(fullUser),
        currentUser: result,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}

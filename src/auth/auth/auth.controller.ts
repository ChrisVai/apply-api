import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from '../decorators/public-decorator';
import { LocalAuthGuard } from '../guard/local-auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return req.logout();
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltOrRounds = 10;
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(this.saltOrRounds);
    return await bcrypt.hash(password, salt);
  }

  async compareHashedPassword(password1: string, password2: string) {
    return await bcrypt.compare(password1, password2);
  }

  async hash(string: string) {
    const salt = await bcrypt.genSalt(this.saltOrRounds);
    return await bcrypt.hash(string, salt);
  }
}

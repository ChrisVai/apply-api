import { Test, TestingModule } from '@nestjs/testing';
import { AuthRefreshTokenServiceService } from './auth-refresh-token.service';

describe('AuthRefreshTokenServiceService', () => {
  let service: AuthRefreshTokenServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRefreshTokenServiceService],
    }).compile();

    service = module.get<AuthRefreshTokenServiceService>(
      AuthRefreshTokenServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

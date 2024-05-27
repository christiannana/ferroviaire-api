import { Test, TestingModule } from '@nestjs/testing';
import { USER_AccountService } from './users-account.service';

describe('USER_AccountService', () => {
  let service: USER_AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [USER_AccountService],
    }).compile();

    service = module.get<USER_AccountService>(USER_AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

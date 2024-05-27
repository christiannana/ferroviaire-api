import { Test, TestingModule } from '@nestjs/testing';
import { USER_AccountService } from './users-account.service';
import { USER_AccountController } from './users-account.controller';

describe('USER_AccountController', () => {
  let controller: USER_AccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [USER_AccountController],
      providers: [USER_AccountService],
    }).compile();

    controller = module.get<USER_AccountController>(USER_AccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

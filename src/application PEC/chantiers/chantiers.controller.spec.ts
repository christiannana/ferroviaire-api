import { Test, TestingModule } from '@nestjs/testing';
import { ChantiersController } from './chantiers.controller';
import { ChantiersService } from './chantiers.service';

describe('ChantiersController', () => {
  let controller: ChantiersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChantiersController],
      providers: [ChantiersService],
    }).compile();

    controller = module.get<ChantiersController>(ChantiersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

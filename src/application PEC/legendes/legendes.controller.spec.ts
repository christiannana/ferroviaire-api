import { Test, TestingModule } from '@nestjs/testing';
import { LegendesController } from './legendes.controller';
import { LegendesService } from './legendes.service';

describe('LegendesController', () => {
  let controller: LegendesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LegendesController],
      providers: [LegendesService],
    }).compile();

    controller = module.get<LegendesController>(LegendesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

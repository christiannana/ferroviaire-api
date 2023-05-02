import { Test, TestingModule } from '@nestjs/testing';
import { PlanPecController } from './plan-pec.controller';
import { PlanPecService } from './plan-pec.service';

describe('PlanPecController', () => {
  let controller: PlanPecController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanPecController],
      providers: [PlanPecService],
    }).compile();

    controller = module.get<PlanPecController>(PlanPecController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

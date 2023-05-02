import { Test, TestingModule } from '@nestjs/testing';
import { PlanPecService } from './plan-pec.service';

describe('PlanPecService', () => {
  let service: PlanPecService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanPecService],
    }).compile();

    service = module.get<PlanPecService>(PlanPecService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

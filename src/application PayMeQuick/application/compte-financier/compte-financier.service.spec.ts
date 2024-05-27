import { Test, TestingModule } from '@nestjs/testing';
import { CompteFinancierService } from './compte-financier.service';

describe('CompteFinancierService', () => {
  let service: CompteFinancierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompteFinancierService],
    }).compile();

    service = module.get<CompteFinancierService>(CompteFinancierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HistoriqueTransactionService } from './historique-transaction.service';

describe('HistoriqueTransactionService', () => {
  let service: HistoriqueTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoriqueTransactionService],
    }).compile();

    service = module.get<HistoriqueTransactionService>(HistoriqueTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { HistoriqueTransactionController } from './historique-transaction.controller';
import { HistoriqueTransactionService } from './historique-transaction.service';

describe('HistoriqueTransactionController', () => {
  let controller: HistoriqueTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriqueTransactionController],
      providers: [HistoriqueTransactionService],
    }).compile();

    controller = module.get<HistoriqueTransactionController>(HistoriqueTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

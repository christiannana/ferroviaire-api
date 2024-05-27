import { Test, TestingModule } from '@nestjs/testing';
import { CompteFinancierController } from './compte-financier.controller';
import { CompteFinancierService } from './compte-financier.service';

describe('CompteFinancierController', () => {
  let controller: CompteFinancierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompteFinancierController],
      providers: [CompteFinancierService],
    }).compile();

    controller = module.get<CompteFinancierController>(CompteFinancierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

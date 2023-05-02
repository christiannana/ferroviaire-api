import { Test, TestingModule } from '@nestjs/testing';
import { BanqueShemasService } from './banque-shemas.service';

describe('BanqueShemasService', () => {
  let service: BanqueShemasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BanqueShemasService],
    }).compile();

    service = module.get<BanqueShemasService>(BanqueShemasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

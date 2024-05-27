import { Test, TestingModule } from '@nestjs/testing';
import { HistoriqueConnexionService } from './historique-connexion.service';

describe('HistoriqueConnexionService', () => {
  let service: HistoriqueConnexionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoriqueConnexionService],
    }).compile();

    service = module.get<HistoriqueConnexionService>(HistoriqueConnexionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

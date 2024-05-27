import { Test, TestingModule } from '@nestjs/testing';
import { HistoriqueConnexionController } from './historique-connexion.controller';
import { HistoriqueConnexionService } from './historique-connexion.service';

describe('HistoriqueConnexionController', () => {
  let controller: HistoriqueConnexionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoriqueConnexionController],
      providers: [HistoriqueConnexionService],
    }).compile();

    controller = module.get<HistoriqueConnexionController>(HistoriqueConnexionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

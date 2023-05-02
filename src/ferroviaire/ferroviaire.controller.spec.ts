import { Test, TestingModule } from '@nestjs/testing';
import { FerroviaireController } from './ferroviaire.controller';
import { FerroviaireService } from './ferroviaire.service';

describe('FerroviaireController', () => {
  let controller: FerroviaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FerroviaireController],
      providers: [FerroviaireService],
    }).compile();

    controller = module.get<FerroviaireController>(FerroviaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

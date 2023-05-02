import { Test, TestingModule } from '@nestjs/testing';
import { FerroviaireService } from './ferroviaire.service';

describe('FerroviaireService', () => {
  let service: FerroviaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FerroviaireService],
    }).compile();

    service = module.get<FerroviaireService>(FerroviaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { InformAllCityService } from './inform-all-city.service';

describe('InformAllCityService', () => {
  let service: InformAllCityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InformAllCityService],
    }).compile();

    service = module.get<InformAllCityService>(InformAllCityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

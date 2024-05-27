import { Test, TestingModule } from '@nestjs/testing';
import { InformAllCityController } from './inform-all-city.controller';
import { InformAllCityService } from './inform-all-city.service';

describe('InformAllCityController', () => {
  let controller: InformAllCityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformAllCityController],
      providers: [InformAllCityService],
    }).compile();

    controller = module.get<InformAllCityController>(InformAllCityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { BanqueShemasController } from './banque-shemas.controller';
import { BanqueShemasService } from './banque-shemas.service';

describe('BanqueShemasController', () => {
  let controller: BanqueShemasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BanqueShemasController],
      providers: [BanqueShemasService],
    }).compile();

    controller = module.get<BanqueShemasController>(BanqueShemasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

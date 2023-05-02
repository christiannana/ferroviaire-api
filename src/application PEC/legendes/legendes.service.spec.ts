import { Test, TestingModule } from '@nestjs/testing';
import { LegendesService } from './legendes.service';

describe('LegendesService', () => {
  let service: LegendesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LegendesService],
    }).compile();

    service = module.get<LegendesService>(LegendesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Module } from '@nestjs/common';
import { InformAllCityService } from './inform-all-city.service';
import { InformAllCityController } from './inform-all-city.controller';

@Module({
  controllers: [InformAllCityController],
  providers: [InformAllCityService],
})
export class InformAllCityModule {}

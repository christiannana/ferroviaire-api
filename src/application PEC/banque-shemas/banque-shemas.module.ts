import { Module } from '@nestjs/common';
import { BanqueShemasService } from './banque-shemas.service';
import { BanqueShemasController } from './banque-shemas.controller';

@Module({
  controllers: [BanqueShemasController],
  providers: [BanqueShemasService]
})
export class BanqueShemasModule {}

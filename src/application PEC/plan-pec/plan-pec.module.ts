import { Module } from '@nestjs/common';
import { PlanPecService } from './plan-pec.service';
import { PlanPecController } from './plan-pec.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { pdfEnvoyerData, planPECdata } from './schema_mongoDB/planPEC.schema';
import { personnelData } from '../personnel/schema_mongoDB/personnel.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'planPECdata', schema: planPECdata },
      { name: 'personnelData', schema: personnelData },
      { name: 'pdfEnvoyerData', schema: pdfEnvoyerData },
    ])
  ],
  controllers: [PlanPecController],
  providers: [PlanPecService,]
})
export class PlanPecModule {}

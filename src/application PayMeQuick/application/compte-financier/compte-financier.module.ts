import { HttpModule, Module } from '@nestjs/common';
import { CompteFinancierService } from './compte-financier.service';
import { CompteFinancierController } from './compte-financier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { pay_COMPTE_FINANCIER } from './entities/compte-financier.entity';
import { SmsService } from 'src/application PayMeQuick/shared/services/sms/sms.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'pay_COMPTE_FINANCIER', schema: pay_COMPTE_FINANCIER },
    ]),

    HttpModule,
  ],
  controllers: [CompteFinancierController],
  providers: [CompteFinancierService, SmsService],
})
export class CompteFinancierModule {}

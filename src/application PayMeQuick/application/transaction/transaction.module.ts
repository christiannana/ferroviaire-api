import { HttpModule, Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { pay_TRANSACTION } from './entities/transaction.entity';
import { pay_COMPTE_FINANCIER } from '../compte-financier/entities/compte-financier.entity';
import { SmsService } from 'src/application PayMeQuick/shared/services/sms/sms.service';
import { pay_USER_ACCOUNT } from '../users-account/entities/users-account.entity';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: 'pay_TRANSACTION', schema: pay_TRANSACTION },
      { name: 'pay_COMPTE_FINANCIER', schema: pay_COMPTE_FINANCIER },
      { name: 'pay_USER_ACCOUNT', schema: pay_USER_ACCOUNT },
    ]),

    HttpModule

  ],
  controllers: [TransactionController],
  providers: [TransactionService, SmsService]
})
export class TransactionModule {}

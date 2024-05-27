import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { pay_OTPCODE, pay_USER_ACCOUNT } from './entities/users-account.entity';

import { pay_HISTORIQUE_CONNEXION } from '../historique-connexion/entities/historique-connexion.entity';
import { pay_COMPTE_FINANCIER } from '../compte-financier/entities/compte-financier.entity';
import { SmsService } from 'src/application PayMeQuick/shared/services/sms/sms.service';
import { USER_AccountService } from './users-account.service';
import { USER_AccountController } from './users-account.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'pay_USER_ACCOUNT', schema: pay_USER_ACCOUNT },
      { name: 'pay_HISTORIQUE_CONNEXION', schema: pay_HISTORIQUE_CONNEXION },
      { name: 'pay_COMPTE_FINANCIER', schema: pay_COMPTE_FINANCIER },
      { name: 'pay_OTPCODE', schema: pay_OTPCODE },
    ]),

    HttpModule,
  ],
  controllers: [USER_AccountController],
  providers: [USER_AccountService, SmsService],
})
export class UserAccountModule {}

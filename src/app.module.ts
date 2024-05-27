
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BanqueShemasModule } from './application PEC/banque-shemas/banque-shemas.module';
import { ChantiersModule } from './application PEC/chantiers/chantiers.module';
import { ClientsModule } from './application PEC/clients/clients.module';
import { LegendesModule } from './application PEC/legendes/legendes.module';
import { PersonnelModule } from './application PEC/personnel/personnel.module';
import { PlanPecModule } from './application PEC/plan-pec/plan-pec.module';
import { FormulaireModule } from './formulaire/formulaire.module';
import { FormulaireExploittationModule } from './formulaire_Exploitation/formulaire.module';
import { UserAccountModule } from './application PayMeQuick/application/users-account/users-account.module';
import { TransactionModule } from './application PayMeQuick/application/transaction/transaction.module';
import { CompteFinancierModule } from './application PayMeQuick/application/compte-financier/compte-financier.module';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    FormulaireModule,
    FormulaireExploittationModule,
    LegendesModule,
    PersonnelModule,
    PlanPecModule,
    ClientsModule,
    ChantiersModule,
    BanqueShemasModule,


    UserAccountModule,
    TransactionModule,
    CompteFinancierModule,


    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_PAYMEQUICK,
      signOptions: { expiresIn: '30d' },
    }),
    
    MongooseModule.forRoot(process.env.MONGODB_URI),

    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'mail.faseya-dev.com',
          host: 'mail.faseya-dev.com',
          port: 465,
          secure: true, // upgrade later with STARTTLS
          auth: {
            user: 'luxury@faseya-dev.com',
            pass: 'luxurypasse',
          },
        },
        defaults: {
          from: '"Luxury" <luxury@faseya-dev.com>',
        },
        // template: {
        //   dir: './email_template/',
        //   adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
    }),

  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule { }

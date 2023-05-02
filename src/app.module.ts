
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

    MongooseModule.forRoot('mongodb+srv://benawa_admin:nanamongodb2022@benawadb.qt3it.mongodb.net/FerroviaireDB?retryWrites=true&w=majority'),


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
  providers: [AppService],
})
export class AppModule { }

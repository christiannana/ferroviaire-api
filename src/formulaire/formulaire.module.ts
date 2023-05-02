import { Module } from '@nestjs/common';
import { FormulaireService } from './formulaire.service';
import { FormulaireController } from './formulaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { questionnaireGestion, trameGestion } from './schemas/trameGestion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'trameGestion', schema: trameGestion },
      { name: 'questionnaireGestion', schema: questionnaireGestion },
    ])
  ],
  controllers: [FormulaireController],
  providers: [FormulaireService]
})
export class FormulaireModule { }

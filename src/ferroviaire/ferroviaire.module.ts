import { Module } from '@nestjs/common';
import { FerroviaireService } from './ferroviaire.service';
import { FerroviaireController } from './ferroviaire.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { trame } from './schema_mongoDB/formulaire.schema';


@Module({
  controllers: [FerroviaireController],

  imports: [
    MongooseModule.forFeature([
      { name: 'trame', schema: trame },
    ]),
  ],

  providers: [FerroviaireService]
})
export class FerroviaireModule {}

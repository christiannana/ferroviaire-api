import { Module } from '@nestjs/common';
import { ChantiersService } from './chantiers.service';
import { ChantiersController } from './chantiers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { chantierData, dossierChantierData } from './schema_mongoDB/chantier.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'chantierData', schema: chantierData },
      { name: 'dossierChantierData', schema: dossierChantierData },
    ])
  ],
  controllers: [ChantiersController],
  providers: [ChantiersService]
})
export class ChantiersModule {}

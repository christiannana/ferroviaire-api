import { Module } from '@nestjs/common';
import { HistoriqueConnexionService } from './historique-connexion.service';
import { HistoriqueConnexionController } from './historique-connexion.controller';

@Module({
  controllers: [HistoriqueConnexionController],
  providers: [HistoriqueConnexionService],
})
export class HistoriqueConnexionModule {}

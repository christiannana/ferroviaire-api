import { Module } from '@nestjs/common';
import { HistoriqueTransactionService } from './historique-transaction.service';
import { HistoriqueTransactionController } from './historique-transaction.controller';

@Module({
  controllers: [HistoriqueTransactionController],
  providers: [HistoriqueTransactionService],
})
export class HistoriqueTransactionModule {}

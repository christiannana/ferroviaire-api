import { Injectable } from '@nestjs/common';
import { CreateHistoriqueTransactionDto } from './dto/create-historique-transaction.dto';
import { UpdateHistoriqueTransactionDto } from './dto/update-historique-transaction.dto';

@Injectable()
export class HistoriqueTransactionService {
  create(createHistoriqueTransactionDto: CreateHistoriqueTransactionDto) {
    return 'This action adds a new historiqueTransaction';
  }

  findAll() {
    return `This action returns all historiqueTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historiqueTransaction`;
  }

  update(id: number, updateHistoriqueTransactionDto: UpdateHistoriqueTransactionDto) {
    return `This action updates a #${id} historiqueTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} historiqueTransaction`;
  }
}

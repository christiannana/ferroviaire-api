import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriqueTransactionDto } from './create-historique-transaction.dto';

export class UpdateHistoriqueTransactionDto extends PartialType(CreateHistoriqueTransactionDto) {}

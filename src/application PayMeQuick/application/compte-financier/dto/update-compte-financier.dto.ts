import { PartialType } from '@nestjs/mapped-types';
import { CreateCompteFinancierDto } from './create-compte-financier.dto';

export class UpdateCompteFinancierDto extends PartialType(CreateCompteFinancierDto) {}

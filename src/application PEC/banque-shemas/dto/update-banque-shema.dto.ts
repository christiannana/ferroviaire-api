import { PartialType } from '@nestjs/mapped-types';
import { CreateBanqueShemaDto } from './create-banque-shema.dto';

export class UpdateBanqueShemaDto extends PartialType(CreateBanqueShemaDto) {}

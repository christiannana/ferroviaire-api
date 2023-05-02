import { PartialType } from '@nestjs/mapped-types';
import { CreateChantierDto, CreateDossierChantierDto } from './create-chantier.dto';

export class UpdateChantierDto extends PartialType(CreateChantierDto) {}

export class UpdateDossierChantierDto extends PartialType(CreateDossierChantierDto) {}


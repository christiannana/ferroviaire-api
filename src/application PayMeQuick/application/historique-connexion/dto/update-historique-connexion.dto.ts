import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoriqueConnexionDto } from './create-historique-connexion.dto';

export class UpdateHistoriqueConnexionDto extends PartialType(CreateHistoriqueConnexionDto) {}

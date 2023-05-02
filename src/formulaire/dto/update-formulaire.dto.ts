import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionnaireDto, CreateTrameDto } from './create-formulaire.dto';


export class UpdateTrameDto extends PartialType(CreateTrameDto) {}

export class UpdateQuestionnaireDto extends PartialType(CreateQuestionnaireDto) {}



import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanPecDto } from './create-plan-pec.dto';

export class UpdatePlanPecDto extends PartialType(CreatePlanPecDto) {}

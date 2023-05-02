import { PartialType } from '@nestjs/mapped-types';
import { CreateLegendeDto } from './create-legende.dto';

export class UpdateLegendeDto extends PartialType(CreateLegendeDto) {}

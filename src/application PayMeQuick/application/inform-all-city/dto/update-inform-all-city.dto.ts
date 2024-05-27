import { PartialType } from '@nestjs/mapped-types';
import { CreateInformAllCityDto } from './create-inform-all-city.dto';

export class UpdateInformAllCityDto extends PartialType(CreateInformAllCityDto) {}

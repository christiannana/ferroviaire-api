import { PartialType } from '@nestjs/mapped-types';
import { ModifieUserAccountDto } from './create-users-account.dto';

export class UpdateUserAccountDto extends PartialType(ModifieUserAccountDto) {}

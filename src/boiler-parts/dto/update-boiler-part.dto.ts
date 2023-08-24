import { PartialType } from '@nestjs/mapped-types';
import { CreateBoilerPartDto } from './create-boiler-part.dto';

export class UpdateBoilerPartDto extends PartialType(CreateBoilerPartDto) {}

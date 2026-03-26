import { PartialType } from '@nestjs/swagger';
import { CreateRainyDayDto } from './create-rainyday.dto';

export class UpdateRainyDayDto extends PartialType(CreateRainyDayDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateStopOverDto } from './create-stopover.dto';

export class UpdateStopOverDto extends PartialType(CreateStopOverDto) {}

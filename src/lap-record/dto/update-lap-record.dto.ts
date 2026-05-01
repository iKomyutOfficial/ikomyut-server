import { PartialType } from '@nestjs/swagger';
import { CreateLapRecordDto } from './create-lap-record.dto';

export class UpdateLapRecordDto extends PartialType(CreateLapRecordDto) {}

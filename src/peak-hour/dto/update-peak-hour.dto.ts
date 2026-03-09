import { PartialType } from '@nestjs/swagger';
import { CreatePeakHourDto } from './create-peak-hour.dto';

export class UpdatePeakHourDto extends PartialType(CreatePeakHourDto) {}
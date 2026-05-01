import { PartialType } from '@nestjs/swagger';
import { CreateLapCounterSettingsDto } from './create-lap-counter-settings.dto';

export class UpdateLapCounterSettingsDto extends PartialType(
  CreateLapCounterSettingsDto,
) {}

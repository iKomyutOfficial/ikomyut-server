import { PartialType } from '@nestjs/swagger';
import { CreateTrafficIntensityDto } from './create-traffic-intensity.dto';

export class UpdateTrafficIntensityDto extends PartialType(
  CreateTrafficIntensityDto,
) {}
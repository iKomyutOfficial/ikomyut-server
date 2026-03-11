import { PartialType } from '@nestjs/swagger';
import { CreateRainyDaySurchargeDto } from './create-rainy-day-surcharge.dto';

export class UpdateRainyDaySurchargeDto extends PartialType(CreateRainyDaySurchargeDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateGPSDeviceDto } from './create-gps-device.dto';

export class UpdateGPSDeviceDto extends PartialType(CreateGPSDeviceDto) {}

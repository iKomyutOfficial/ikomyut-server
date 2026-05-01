import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LastLocationDto } from './last-location.dto';

export class CreateGPSDeviceDto {
  @ApiProperty({ example: '356938035643809' })
  @IsString()
  imei!: string;

  @ApiProperty({ example: 'Truck GPS Unit 01' })
  @IsString()
  name!: string;

  @ApiPropertyOptional({ enum: ['online', 'offline'] })
  @IsOptional()
  @IsEnum(['online', 'offline'])
  status?: 'online' | 'offline';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  assignedUnitId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  vehiclePlateNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ type: LastLocationDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => LastLocationDto)
  lastLocation?: LastLocationDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;
}

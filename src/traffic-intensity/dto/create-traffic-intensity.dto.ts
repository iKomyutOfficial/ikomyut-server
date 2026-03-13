import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrafficIntensityDto {
  @ApiPropertyOptional({
    example: 'TI001',
    description: 'Custom identifier for traffic intensity record',
  })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Version field',
  })
  @IsOptional()
  @IsNumber()
  _v?: number;

  @ApiProperty({
    example: 'High',
    description: 'Traffic intensity level',
  })
  @IsString()
  intensityLevel!: string;

  @ApiProperty({
    example: 'Yes',
    description: 'Indicates if this intensity is during peak hour',
  })
  @IsString()
  isPeakHour!: string;

  @ApiProperty({
    example: '1.25',
    description: 'Surcharge rate applied for this intensity',
  })
  @IsString()
  surchargeRate!: string;

  @ApiPropertyOptional({
    example: 'Active',
    description: 'Status of the record',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({
    example: '2026-03-13T08:30:00Z',
    description: 'Timestamp value',
  })
  @IsOptional()
  @IsString()
  timestamp?: string;

  @ApiPropertyOptional({
    example: 'admin',
    description: 'User who created the record',
  })
  @IsOptional()
  @IsString()
  createdBy?: string;

  @ApiPropertyOptional({
    example: '2026-03-13T09:00:00Z',
    description: 'Last update timestamp',
  })
  @IsOptional()
  @IsString()
  updatedAt?: string;

  @ApiPropertyOptional({
    example: 'manager',
    description: 'User who last modified the record',
  })
  @IsOptional()
  @IsString()
  modifiedBy?: string;
}
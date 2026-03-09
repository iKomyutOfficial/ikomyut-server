import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePeakHourDto {
  @ApiPropertyOptional({
    example: 'PH001',
    description: 'Custom identifier for the peak hour record',
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

  @ApiPropertyOptional({
    example: 'Monday',
    description: 'Day of the week',
  })
  @IsOptional()
  @IsString()
  dayOfWeek?: string;

  @ApiPropertyOptional({
    example: 'AM',
    description: 'AM/PM/SPECIAL value',
  })
  @IsOptional()
  @IsString()
  AMPMSPECIAL?: string;

  @ApiPropertyOptional({
    example: '06:00',
    description: 'Start time',
  })
  @IsOptional()
  @IsString()
  FROM?: string;

  @ApiPropertyOptional({
    example: '09:00',
    description: 'End time',
  })
  @IsOptional()
  @IsString()
  TO?: string;

  @ApiProperty({
    example: 15,
    description: 'Peak hour surcharge amount',
  })
  @IsNumber()
  peakHourSurcharge!: number;

  @ApiPropertyOptional({
    example: 'Active',
    description: 'Status of the record',
  })
  @IsOptional()
  @IsString()
  Status?: string;

  @ApiPropertyOptional({
    example: '2026-03-06T08:30:00Z',
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
    example: '2026-03-06T10:00:00Z',
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
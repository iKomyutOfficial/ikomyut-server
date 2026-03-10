import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTnvsConfigurationDto {
  @ApiPropertyOptional({
    example: 'TC001',
    description: 'Custom identifier for the TNVS configuration record',
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
    example: 4,
    description: 'Vehicle seating capacity',
  })
  @IsNumber()
  seaterCapacity!: number;

  @ApiProperty({
    example: 50,
    description: 'Base fare amount',
  })
  @IsNumber()
  baseFare!: number;

  @ApiProperty({
    example: 12,
    description: 'Fare per kilometer',
  })
  @IsNumber()
  perKilometer!: number;

  @ApiProperty({
    example: 2,
    description: 'Fare per minute',
  })
  @IsNumber()
  perMinute!: number;

  @ApiProperty({
    example: 20,
    description: 'Additional stop base fare',
  })
  @IsNumber()
  addStopBaseFare!: number;

  @ApiProperty({
    example: 2.5,
    description: 'Maximum surge multiplier',
  })
  @IsNumber()
  maxSurge!: number;

  @ApiProperty({
    example: 1,
    description: 'Status of the TNVS configuration',
  })
  @IsNumber()
  status!: number;

  @ApiPropertyOptional({
    example: '2026-03-09T08:30:00Z',
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
    example: '2026-03-09T10:00:00Z',
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
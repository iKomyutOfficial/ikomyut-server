import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TnvsConfigurationResponseDto {
  @ApiPropertyOptional({
    example: 'TC001',
    description: 'Custom identifier for the TNVS configuration record',
  })
  id?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Version field',
  })
  _v?: number;

  @ApiProperty({
    example: 4,
    description: 'Vehicle seating capacity',
  })
  seaterCapacity!: number;

  @ApiProperty({
    example: 50,
    description: 'Base fare amount',
  })
  baseFare!: number;

  @ApiProperty({
    example: 12,
    description: 'Fare per kilometer',
  })
  perKilometer!: number;

  @ApiProperty({
    example: 2,
    description: 'Fare per minute',
  })
  perMinute!: number;

  @ApiProperty({
    example: 20,
    description: 'Additional stop base fare',
  })
  addStopBaseFare!: number;

  @ApiProperty({
    example: 2.5,
    description: 'Maximum surge multiplier',
  })
  maxSurge!: number;

  @ApiProperty({
    example: 1,
    description: 'Status of the TNVS configuration',
  })
  status!: number;

  @ApiPropertyOptional({
    example: '2026-03-09T08:30:00Z',
    description: 'Timestamp value',
  })
  timestamp?: string;

  @ApiPropertyOptional({
    example: 'admin',
    description: 'User who created the record',
  })
  createdBy?: string;

  @ApiPropertyOptional({
    example: '2026-03-09T10:00:00Z',
    description: 'Last update timestamp',
  })
  updatedAt?: string;

  @ApiPropertyOptional({
    example: 'manager',
    description: 'User who last modified the record',
  })
  modifiedBy?: string;
}
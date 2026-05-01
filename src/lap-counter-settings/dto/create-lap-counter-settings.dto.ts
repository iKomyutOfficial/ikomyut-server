import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateLapCounterSettingsDto {
  @ApiProperty({
    example: 'account-001',
    description: 'Unique account identifier',
  })
  @IsString()
  account!: string;

  @ApiProperty({
    example: 'geo-12345',
    description: 'Geofence ID reference',
  })
  @IsString()
  geofenceId!: string;

  @ApiPropertyOptional({
    example: 'Warehouse Zone A',
  })
  @IsOptional()
  @IsString()
  geofenceName?: string;

  @ApiPropertyOptional({
    example: 'company-123',
  })
  @IsOptional()
  @IsString()
  companyId?: string;
}

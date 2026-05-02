import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateLapRecordDto {
  @ApiProperty({ example: 'account-001' })
  @IsString()
  account!: string;

  @ApiProperty({ example: '356938035643809' })
  @IsString()
  deviceImei!: string;

  @ApiProperty({ example: 'Truck GPS Unit 01' })
  @IsString()
  deviceName!: string;

  @ApiProperty({ example: 'geo-12345' })
  @IsString()
  geofenceId!: string;

  @ApiPropertyOptional({ example: 'Warehouse Zone A' })
  @IsOptional()
  @IsString()
  geofenceName?: string;

  @ApiProperty({ example: 5, description: 'Lap count number' })
  @IsNumber()
  lapNumber!: number;

  @ApiProperty({
    example: 1714557600000,
    description: 'Unix timestamp in milliseconds',
  })
  @IsNumber()
  timestamp!: number;
}

import { IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class LastLocationDto {
  @ApiPropertyOptional({
    example: 14.5995,
    description: 'Latitude (-90 to 90)',
  })
  @IsOptional()
  @IsNumber()
  lat?: number;

  @ApiPropertyOptional({
    example: 120.9842,
    description: 'Longitude (-180 to 180)',
  })
  @IsOptional()
  @IsNumber()
  lng?: number;

  @ApiPropertyOptional({
    example: 60,
    description: 'Speed in km/h',
  })
  @IsOptional()
  @IsNumber()
  speed?: number;

  @ApiPropertyOptional({
    example: 85,
    description: 'Battery percentage (0-100)',
  })
  @IsOptional()
  @IsNumber()
  battery?: number;

  @ApiPropertyOptional({
    example: '2026-05-01T10:00:00.000Z',
    description: 'ISO 8601 timestamp',
  })
  @IsOptional()
  @IsDateString()
  timestamp?: string;
}

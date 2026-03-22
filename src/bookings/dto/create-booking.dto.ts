import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto';

export class CreateBookingDto {
  @ApiProperty({ example: 'rider123' })
  @IsString()
  riderId!: string;

  @ApiPropertyOptional({ example: 'driver123' })
  @IsOptional()
  @IsString()
  driverId?: string;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  origin!: LocationDto;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  destination!: LocationDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  pickupFare?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  travelFare?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;
}

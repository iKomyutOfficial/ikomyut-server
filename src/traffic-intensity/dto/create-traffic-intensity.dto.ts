import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateTrafficIntensityDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  _v!: number;

  @ApiProperty()
  @IsString()
  intensityLevel!: string;

  @ApiProperty()
  @IsString()
  isPeakHour!: string;

  @ApiProperty()
  @IsString()
  surchargeRate!: string;

  @ApiProperty()
  @IsString()
  status!: string;

  @ApiProperty()
  @IsString()
  timestamp!: string;

  @ApiProperty()
  @IsString()
  createdBy!: string;

  @ApiProperty()
  @IsString()
  updatedAt!: string;

  @ApiProperty()
  @IsString()
  modifiedBy!: string;
}
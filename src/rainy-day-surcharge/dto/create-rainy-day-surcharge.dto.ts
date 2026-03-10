import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateRainyDaySurchargeDto {
  @ApiProperty()
  @IsString()
  id!: string;

  @ApiProperty()
  @IsString()
  weatherCondition!: string;

  @ApiProperty()
  @IsNumber()
  intensityFactor!: number;

  @ApiProperty()
  @IsNumber()
  baseSurcharge!: number;

  @ApiProperty()
  @IsNumber()
  rainyDaySurchargerate!: number;

  @ApiProperty()
  @IsString()
  status!: string;

  @ApiProperty()
  @IsString()
  timestamp!: string;

  @ApiProperty()
  @IsString()
  createdBy!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  modifiedBy?: string;

  @ApiPropertyOptional({ type: Number, nullable: true })
  @IsOptional()
  surchargeRate?: number | null;
}

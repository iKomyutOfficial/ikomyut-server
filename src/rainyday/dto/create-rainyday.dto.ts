import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRainyDayDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  weatherCondition!: string;

  @ApiProperty()
  intensityFactor!: number;

  @ApiProperty()
  baseSurcharge!: number;

  @ApiProperty()
  rainyDaySurchargerate!: number;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  timestamp!: string;

  @ApiProperty()
  createdBy!: string;

  @ApiPropertyOptional()
  modifiedBy?: string;

  @ApiPropertyOptional()
  surchargeRate?: number;
}

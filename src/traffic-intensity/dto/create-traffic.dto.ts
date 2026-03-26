import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTrafficDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  intensityLevel!: string;

  @ApiProperty()
  isPeakHour!: boolean;

  @ApiProperty()
  surchargeRate!: number;

  @ApiProperty()
  status!: string;

  @ApiPropertyOptional()
  createdBy?: string;

  @ApiPropertyOptional()
  modifiedBy?: string;
}

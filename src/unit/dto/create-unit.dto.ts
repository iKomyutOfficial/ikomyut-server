import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { toValidDate } from '../../common/utils/validation';
import { GeoPointDto } from '../../common/dto/location.dto';

class MaintenancePartDto {
  @ApiProperty({ example: 'Brake Pad' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  quantity!: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  cost!: number;
}

class MaintenanceRecordDto {
  @ApiProperty({ example: '2026-04-29' })
  @Type(() => Date)
  date!: string;

  @ApiProperty({ example: 'Brake replacement' })
  @IsString()
  description!: string;

  @ApiPropertyOptional({ example: 'Juan Mechanic' })
  @IsOptional()
  @IsString()
  mechanic?: string;

  @ApiPropertyOptional({ type: [MaintenancePartDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MaintenancePartDto)
  parts?: MaintenancePartDto[];

  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @IsNumber()
  laborCost?: number;

  @ApiPropertyOptional({ example: 2000 })
  @IsOptional()
  @IsNumber()
  totalCost?: number;
}

export class CreateUnitDto {
  @ApiProperty({ example: 'BUS-001' })
  @IsOptional()
  @IsString()
  unitCode?: string;

  @ApiProperty({ example: 'ABC-1234' })
  @IsString()
  plateNumber!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bodyNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  caseNumber?: string;

  @ApiProperty({ example: 'Toyota' })
  @IsString()
  brand!: string;

  @ApiProperty({ example: 'Coaster 2020' })
  @IsString()
  model!: string;

  @ApiPropertyOptional({ example: 30 })
  @IsOptional()
  @IsNumber()
  seatingCapacity?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({
    enum: ['Active', 'Inactive', 'Maintenance'],
    default: 'Active',
  })
  @IsOptional()
  @IsEnum(['Active', 'Inactive', 'Maintenance'])
  status?: 'Active' | 'Inactive' | 'Maintenance';

  @IsOptional()
  @Transform(({ value }) => toValidDate(value))
  lastInspectionDate?: Date;

  @IsOptional()
  @Transform(({ value }) => toValidDate(value))
  insuranceExpiryDate?: Date;

  @IsOptional()
  @Transform(({ value }) => toValidDate(value))
  registrationExpiryDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isAssign?: boolean;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiPropertyOptional({ type: GeoPointDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => GeoPointDto)
  location?: GeoPointDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imei?: string;
}

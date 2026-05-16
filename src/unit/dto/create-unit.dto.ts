import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GeoPointDto } from '../../common/dto/location.dto';

export class CreateUnitDto {
  @ApiProperty({
    example: 'BUS-001',
  })
  @IsOptional()
  @IsString()
  unitCode?: string;

  @ApiProperty({
    example: 'ABC-1234',
  })
  @IsString()
  plateNumber!: string;

  @ApiPropertyOptional({
    example: 'BDY-1001',
  })
  @IsOptional()
  @IsString()
  bodyNumber?: string;

  @ApiPropertyOptional({
    example: 'CASE-2001',
  })
  @IsOptional()
  @IsString()
  caseNumber?: string;

  @ApiProperty({
    example: 'Toyota',
  })
  @IsString()
  brand!: string;

  @ApiProperty({
    example: 'Coaster 2020',
  })
  @IsString()
  model!: string;

  @ApiPropertyOptional({
    example: 30,
  })
  @IsOptional()
  @IsNumber()
  seatingCapacity?: number;

  @ApiPropertyOptional({
    example: 'ABC Transport',
  })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({
    example: 'COMP-001',
  })
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

  @ApiPropertyOptional({
    example: '2026-04-29',
  })
  @IsOptional()
  @IsString()
  lastInspectionDate?: string;

  @ApiPropertyOptional({
    example: '2026-12-31',
  })
  @IsOptional()
  @IsString()
  insuranceExpiryDate?: string;

  @ApiPropertyOptional({
    example: '2026-10-15',
  })
  @IsOptional()
  @IsString()
  registrationExpiryDate?: string;

  @ApiPropertyOptional({
    example: 'Unit requires monthly inspection',
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isAssign?: boolean;

  @ApiPropertyOptional({
    type: [String],
    example: ['https://sample.com/image1.jpg'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({
    type: GeoPointDto,
  })
  @IsOptional()
  @ValidateNested()
  location?: GeoPointDto;

  @ApiPropertyOptional({
    example: '123456789012345',
  })
  @IsOptional()
  @IsString()
  imei?: string;
}

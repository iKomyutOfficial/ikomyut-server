import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateFleetDto {
  @ApiProperty({ example: 'BUS-001' })
  @IsString()
  assignUnitCode!: string;

  @ApiPropertyOptional({ example: 'COMP-001' })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ example: 'ROUTE-001' })
  @IsOptional()
  @IsString()
  assignedRouteId?: string;

  @ApiPropertyOptional({ example: 'ROUTE-002' })
  @IsOptional()
  @IsString()
  assignedRouteIdOne?: string;

  @ApiPropertyOptional({ example: 'DRIVER-001' })
  @IsOptional()
  @IsString()
  assignedDriverId?: string;

  @ApiPropertyOptional({ example: 'CONDUCTOR-001' })
  @IsOptional()
  @IsString()
  assignedConductorId?: string;

  @ApiPropertyOptional({ example: 'Active', default: 'Active' })
  status?: string;
}

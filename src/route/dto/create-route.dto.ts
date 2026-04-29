import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class GeoPointDto {
  @ApiProperty({ example: 'Point' })
  @IsString()
  type!: 'Point';

  @ApiProperty({ example: [121.0437, 14.676] })
  @IsArray()
  coordinates!: [number, number];
}

class StopOverDto {
  @ApiProperty({ example: 'Cubao' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Cubao Terminal' })
  @IsString()
  address!: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [121.0437, 14.676] },
  })
  @ValidateNested()
  @Type(() => GeoPointDto)
  location!: GeoPointDto;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  P2PPU?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  P2PDO?: boolean;
}

export class CreateRouteDto {
  @ApiProperty({ example: 'ROUTE-001' })
  @IsString()
  routeId!: string;

  @ApiProperty({ example: 'Cubao' })
  @IsString()
  terminalPointA!: string;

  @ApiProperty({ example: 'Manila' })
  @IsString()
  terminalPointB!: string;

  @ApiPropertyOptional({ type: [StopOverDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StopOverDto)
  stopOver?: StopOverDto[];

  @ApiPropertyOptional({ example: 'My Bus Company' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional({ example: 'COMP-001' })
  @IsOptional()
  @IsString()
  companyId?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsNumber()
  fareP2P?: number;

  @ApiPropertyOptional({ example: 15 })
  @IsOptional()
  @IsNumber()
  minFare?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @IsNumber()
  fixedDistance?: number;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isAssign?: boolean;
}

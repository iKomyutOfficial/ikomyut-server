import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  IsDateString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GeoPointDto } from '../../common/dto/location.dto';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @ApiProperty({ example: 'TCK-0001' })
  @IsString()
  refNumber!: string;

  @ApiProperty({ example: 'BUS-001' })
  @IsString()
  unitCode!: string;

  @ApiProperty({ example: 'ABC-1234' })
  @IsString()
  plateNumber!: string;

  @ApiProperty({ example: 'ROUTE-001' })
  @IsString()
  routeId!: string;

  @ApiProperty({ example: 'driver1' })
  @IsString()
  driverUsername!: string;

  @ApiProperty({ example: 'conductor1' })
  @IsString()
  conductorUsername!: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [121.0437, 14.676] },
  })
  @ValidateNested()
  @Type(() => GeoPointDto)
  pickupLoc!: GeoPointDto;

  @ApiProperty({
    example: { type: 'Point', coordinates: [121.0437, 14.676] },
  })
  @ValidateNested()
  @Type(() => GeoPointDto)
  dropoffLoc!: GeoPointDto;

  @ApiProperty({ example: 'Cubao Terminal' })
  @IsString()
  pickupAddress!: string;

  @ApiProperty({ example: 'Manila Central' })
  @IsString()
  dropoffAddress!: string;

  @ApiProperty({ example: '2026-04-29T10:00:00Z' })
  @IsDateString()
  timestamp!: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  fare!: number;

  @ApiProperty({ example: 12.5 })
  @IsNumber()
  @Min(0)
  distance!: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsNumber()
  fixedDistance?: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  discount!: number;
}

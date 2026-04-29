import {
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
  IsDateString,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

type GeoPoint = {
  type: 'Point';
  coordinates: [number, number];
};

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
  @IsObject()
  pickupLoc!: GeoPoint;

  @ApiProperty({
    example: { type: 'Point', coordinates: [121.056, 14.59] },
  })
  @IsObject()
  dropoffLoc!: GeoPoint;

  @ApiProperty({ example: 'Cubao Terminal' })
  @IsString()
  pickupAddress!: string;

  @ApiProperty({ example: 'Manila Central' })
  @IsString()
  dropoffAddress!: string;

  @ApiProperty({ example: 'COMP-001' })
  @IsString()
  companyId!: string;

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
  @Min(0)
  fixedDistance?: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(0)
  discount!: number;
}

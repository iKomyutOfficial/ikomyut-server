import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Location } from '../../common/schemas/location.schema';
import { Type } from 'class-transformer';

class GeoPointDto {
  @ApiProperty({ example: 'Point' })
  @IsString()
  type!: 'Point';

  @ApiProperty({ example: [121.0437, 14.676] })
  @IsArray()
  coordinates!: [number, number];
}

export class CreateStopOverDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  routeId!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty()
  @IsString()
  address!: string;

  @ApiProperty({
    example: { type: 'Point', coordinates: [121.0437, 14.676] },
  })
  @ValidateNested()
  @Type(() => GeoPointDto)
  location!: GeoPointDto;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  P2PPU?: boolean;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  P2PDO?: boolean;
}

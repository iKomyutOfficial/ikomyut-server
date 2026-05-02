import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GeoPointDto } from '../../common/dto/location.dto';

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

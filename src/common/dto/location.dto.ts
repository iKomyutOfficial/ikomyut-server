import {
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNumber,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GeoPointDto {
  @ApiProperty({ example: 'Point', enum: ['Point'] })
  @IsIn(['Point'])
  type!: 'Point';

  @ApiProperty({ example: [121.0437, 14.676], type: [Number] })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates!: number[];
}

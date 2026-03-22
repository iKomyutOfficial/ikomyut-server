import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber } from 'class-validator';

export class LocationDto {
  @ApiProperty({ example: 'Quezon City' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Point' })
  @IsString()
  type!: string;

  @ApiProperty({ example: [121.0437, 14.676] })
  @IsArray()
  @IsNumber({}, { each: true })
  coordinates!: number[];
}

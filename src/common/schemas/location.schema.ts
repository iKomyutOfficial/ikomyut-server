import {
  IsArray,
  IsIn,
  IsNumber,
  ArrayMinSize,
  ArrayMaxSize,
} from 'class-validator';

export class Location {
  @IsIn(['Point'])
  type!: 'Point';

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates!: [number, number];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTimeMatrixDto {
  @ApiProperty({ example: '08:00' })
  @IsString()
  @IsNotEmpty()
  rangeTimeFrom!: string;

  @ApiProperty({ example: '17:00' })
  @IsString()
  @IsNotEmpty()
  rangeTimeTo!: string;

  @ApiProperty({ example: 540 })
  @IsNumber()
  @IsNotEmpty()
  tTime!: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  status!: number;

  @ApiProperty({ example: 'admin_user' })
  @IsString()
  @IsNotEmpty()
  createdBy!: string;
}
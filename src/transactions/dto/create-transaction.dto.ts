import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 150.5 })
  @IsNumber()
  amount!: number;

  @ApiProperty({ example: '661f1c2b9c1234567890abcd' })
  @IsMongoId()
  bookingId!: string;

  @ApiProperty({ example: '661f1c2b9c1234567890abcd' })
  @IsMongoId()
  userId!: string;

  @ApiProperty({ enum: ['driver', 'rider'], example: 'rider' })
  @IsEnum(['driver', 'rider'])
  userType!: string;

  @ApiProperty({ example: 'Ride payment' })
  @IsString()
  description!: string;

  @ApiPropertyOptional({ example: 'GCash' })
  @IsOptional()
  @IsString()
  topupBy?: string;
}

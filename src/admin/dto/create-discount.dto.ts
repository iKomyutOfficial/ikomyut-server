import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PhotoDto {
  @ApiProperty({
    description: 'Original file name',
    example: 'student-id.jpg',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Photo URL',
    example: 'https://example.com/student-id.jpg',
  })
  @IsString()
  url!: string;
}

export class CreateDiscountDto {
  @ApiProperty({ description: 'Rider ID', example: 'rider123' })
  @IsString()
  riderId!: string;

  @ApiProperty({
    description: 'ID Number',
    example: '2023-001234',
  })
  @IsString()
  idNumber!: string;

  @ApiProperty({
    description: 'Name',
    example: 'Juan Dela Cruz',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Type of ID',
    enum: ['student', 'senior', 'pwd'],
    example: 'student',
    required: false,
  })
  @IsEnum(['student', 'senior', 'pwd'])
  idType!: 'student' | 'senior' | 'pwd';

  @ApiProperty({
    description: 'Expiration date (ISO format)',
    example: '2026-12-31',
  })
  @IsDateString()
  @IsOptional()
  expirationDate?: string;

  @ApiProperty({
    description: 'Photo information',
    required: false,
    type: PhotoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PhotoDto)
  photoUrl?: PhotoDto;
}

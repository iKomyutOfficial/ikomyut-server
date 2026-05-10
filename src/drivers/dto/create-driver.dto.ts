import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { PhotoDto } from '../../common/dto/photo.dto';
import { PasswordDto } from '../../common/dto/password.dto';

export class CreateDriverDto {
  @ApiProperty({ example: 'driver_john' })
  @IsString()
  username!: string;

  @ValidateNested()
  @Type(() => PasswordDto)
  password!: PasswordDto;

  @ApiPropertyOptional({ example: 'driver', default: 'driver' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  firstName!: string;

  @ApiPropertyOptional({ example: 'Michael' })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName!: string;

  @ApiPropertyOptional({ example: '123 main st.' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '11/11/1990' })
  @IsOptional()
  @IsString()
  dateOfBirth?: Date;

  @ApiPropertyOptional({ example: 'driver@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '+639123456789' })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiPropertyOptional({ example: 'LIC-123456789' })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiPropertyOptional({
    example: 'Professional',
    enum: ['Professional', 'Non-Professional'],
  })
  @IsOptional()
  @IsEnum(['Professional', 'Non-Professional'])
  licenseType?: string;

  @ApiPropertyOptional({ example: '2028-12-31' })
  @IsOptional()
  @IsDateString()
  licenseExpiry?: Date;

  @ApiPropertyOptional({ example: 'EDSA Route' })
  @IsOptional()
  @IsString()
  assignedRoute?: string;

  @ApiPropertyOptional({ example: 'Bus #12' })
  @IsOptional()
  @IsString()
  assignedBus?: string;

  @ApiProperty({
    description: 'Photo information',
    required: false,
    type: PhotoDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => PhotoDto)
  profilePic?: PhotoDto;
}

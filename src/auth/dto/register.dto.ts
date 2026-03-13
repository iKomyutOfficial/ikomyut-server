import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  Matches,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'driver_john', description: 'Unique username' })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ example: 'securePassword123!', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ example: 'driver' })
  @IsString()
  @IsNotEmpty()
  role!: string;

  @ApiProperty({ example: false, description: 'Registration Status' })
  @IsBoolean()
  @IsOptional()
  isRegistered!: boolean;

  // Optional fields remain as they are
  @ApiPropertyOptional({ example: 'John', description: 'First name' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  firstName!: string;

  @ApiPropertyOptional({ example: 'M', description: 'Middle name' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  middleName?: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'Last name' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  lastName!: string;

  @ApiPropertyOptional({
    example: '+639123456789',
    description: 'Unique contact number',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  @Matches(/^\+?\d{10,15}$/, {
    message: 'Contact number must be a valid phone number',
  })
  contactNumber!: string;

  @ApiPropertyOptional({
    example: 'driver@example.com',
    description: 'Unique email address',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    example: 'DL123456789',
    description: 'Driver license number',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  licenseNumber?: string;

  @ApiPropertyOptional({
    example: 'Metro Comet',
    description: 'Company name',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  companyName?: string;

  @ApiPropertyOptional({
    example: '',
    description: 'Company ID',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  companyId?: string;

  @ApiPropertyOptional({
    example: 'Inactive',
    description: 'Account status',
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  status?: string;

  @ApiPropertyOptional({
    description: 'GeoJSON Point representing driver location',
    example: {
      type: 'Point',
      coordinates: [14.739154, 121.15588],
    },
  })
  @IsOptional()
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };

  @ApiProperty({ example: 'Admin', description: 'Employee position' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === '' ? undefined : value))
  position?: string;

  @ApiProperty({
    default: false,
  })
  @IsOptional()
  isAssign?: boolean;
}

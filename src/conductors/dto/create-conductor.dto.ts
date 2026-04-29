import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConductorDto {
  @ApiProperty({ example: 'jdelacruz' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password!: string;

  @ApiPropertyOptional({ default: 'conductor', example: 'conductor' })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ example: 'Juan' })
  @IsString()
  firstName!: string;

  @ApiPropertyOptional({ example: 'Santos' })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ example: 'Dela Cruz' })
  @IsString()
  lastName!: string;

  @ApiPropertyOptional({ example: 'juan@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '09171234567' })
  @IsOptional()
  @IsString()
  contactNumber?: string;

  @ApiPropertyOptional({ example: 'ROUTE-001' })
  @IsOptional()
  @IsString()
  assignedRoute?: string;

  @ApiPropertyOptional({ example: 'BUS-001' })
  @IsOptional()
  @IsString()
  assignedBus?: string;

  @ApiPropertyOptional({ default: false, example: false })
  @IsOptional()
  @IsBoolean()
  isAssign?: boolean;

  @ApiPropertyOptional({
    default: 'Active',
    enum: ['Active', 'Inactive', 'Suspended'],
    example: 'Active',
  })
  @IsOptional()
  @IsEnum(['Active', 'Inactive', 'Suspended'])
  status?: string;

  @ApiPropertyOptional({ example: 'DEVICE-IMEI-123456' })
  @IsOptional()
  @IsString()
  deviceAssigned?: string;

  @ApiPropertyOptional({
    example: {
      type: 'Point',
      coordinates: [121.0437, 14.676],
    },
  })
  @IsOptional()
  location?: any;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  profileImage?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsStrongPassword } from 'class-validator';
import { PhotoDto } from '../../common/dto/photo.dto';

export class CreateConductorDto {
  @ApiProperty({ example: 'driver_john' })
  @IsString()
  username!: string;

  @ApiProperty({
    example: 'Driver@123',
    description:
      'Password must contain uppercase, lowercase, number, and special character',
    default: 'Driver@123',
  })
  @IsStrongPassword()
  password: string = 'driveR@2026!';

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

  @ApiPropertyOptional({ example: 'male' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ example: 'driver@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ example: '+639123456789' })
  @IsOptional()
  @IsString()
  contactNumber?: string;

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
  })
  @IsOptional()
  @IsString()
  profileImage?: string;

  @ApiPropertyOptional({ example: 'Maria Santos' })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiPropertyOptional({ example: '+639171234567' })
  @IsOptional()
  @IsString()
  emergencyContactNumber?: string;

  @ApiPropertyOptional({ example: 'Spouse' })
  @IsOptional()
  @IsString()
  emergencyContactRelationship?: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: 'EMP-2026-001' })
  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  @IsString()
  dateHired?: string;

  @ApiPropertyOptional({ example: 'Regular' })
  @IsOptional()
  @IsString()
  employmentType?: string;

  @ApiPropertyOptional({ example: '34-5678901-2' })
  @IsOptional()
  @IsString()
  sssNumber?: string;

  @ApiPropertyOptional({ example: '12-345678901-2' })
  @IsOptional()
  @IsString()
  philhealthNumber?: string;

  @ApiPropertyOptional({ example: '1234-5678-9012' })
  @IsOptional()
  @IsString()
  pagibigNumber?: string;
}

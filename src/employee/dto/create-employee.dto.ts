import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  ValidateNested,
  IsStrongPassword,
} from 'class-validator';
import { PhotoDto } from '../../common/dto/photo.dto';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  username!: string;

  @IsStrongPassword()
  password!: string;

  @ApiPropertyOptional({ example: 'john@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '09171234567' })
  @IsString()
  mobileNumber!: string;

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

  @ApiProperty({ example: 'executive_leadership' })
  @IsString()
  department!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  position!: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'male' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({
    description: 'Photo information',
  })
  @IsOptional()
  @IsString()
  profileImage?: string;

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
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PhotoDto } from './create-discount.dto';

export class RegisterAdminDto {
  @ApiProperty({
    description: 'Admin username',
    example: 'adminUser',
  })
  @IsNotEmpty()
  @IsString()
  username!: string;

  @ApiProperty({
    description: 'Employee first name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @ApiProperty({
    description: 'Employee middle name',
    example: 'Michael',
  })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({
    description: 'Employee last name',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @ApiProperty({
    description: 'Mobile number',
    example: '+639171234567',
  })
  @IsNotEmpty()
  @IsString()
  mobnum!: string;

  @ApiProperty({
    description: 'Email address of the admin',
    example: 'admin@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Address (optional)',
    example: '123 Main St, Makati City',
    required: false,
  })
  @IsString()
  address!: string;

  @ApiProperty({
    description: 'Password for login',
    example: 'SecureP@ss123',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({
    description: 'Position of the employee',
    example: 'System Administrator',
  })
  @IsNotEmpty()
  @IsString()
  position!: string;

  @ApiProperty({
    description: 'Role ID',
    example: 'role_admin',
  })
  @IsString()
  @IsOptional()
  roleId!: string;

  @ApiProperty({
    description: 'Department',
    example: 'IT Department',
  })
  @IsString()
  department!: string;

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

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'admin1' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password!: string;

  @ApiProperty({ example: 'Metro Comet' })
  @IsString()
  companyName!: string;

  @ApiProperty({ example: 'COMP-001' })
  @IsString()
  companyId!: string;

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

  @ApiPropertyOptional({ example: 'admin@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '9123456789' })
  @IsString()
  mobileNumber!: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/profile.jpg',
  })
  profileImage?: string;
}

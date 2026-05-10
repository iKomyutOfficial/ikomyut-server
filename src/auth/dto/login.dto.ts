import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin1', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: '09171234567', required: false })
  @IsOptional()
  @IsString()
  mobileNumber?: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password!: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'admin123', required: false })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'John', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ example: 'Michael', required: false })
  @IsOptional()
  @IsString()
  middleName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: '09123456789', required: false })
  @IsOptional()
  @IsString()
  mobnum?: string;

  @ApiProperty({ example: 'john.doe@email.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '123 Main St, City', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: 'IT Department', required: false })
  @IsOptional()
  @IsString()
  department?: string;

  @ApiProperty({ example: 'System Administrator', required: false })
  @IsOptional()
  @IsString()
  position?: string;
}

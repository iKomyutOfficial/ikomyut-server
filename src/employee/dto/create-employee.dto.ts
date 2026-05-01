import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEmail, IsBoolean, ValidateNested } from 'class-validator';
import { PhotoDto } from '../../common/dto/photo.dto';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  username!: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString()
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

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  isOAuthUser?: boolean;

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

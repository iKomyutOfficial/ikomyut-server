import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsEmail, ValidateNested } from 'class-validator';
import { PhotoDto } from '../../common/dto/photo.dto';

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

  @ApiProperty({ example: 'executive_leadership' })
  @IsString()
  department!: string;

  @ApiProperty({ example: 'ceo' })
  @IsString()
  position!: string;

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

  @ApiPropertyOptional({ example: 'admin@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '9123456789' })
  @IsString()
  mobileNumber!: string;

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

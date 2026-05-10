import {
  IsString,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PhotoDto } from '../../common/dto/photo.dto';
import { PasswordDto } from '../../common/dto/password.dto';

export class CreateConductorDto {
  @ApiProperty({ example: 'jdelacruz' })
  @IsString()
  username!: string;

  @ValidateNested()
  @Type(() => PasswordDto)
  password!: PasswordDto;

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

  @ApiPropertyOptional({ example: '123 main st.' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '11/11/1990' })
  @IsOptional()
  @IsString()
  dateOfBirth?: Date;

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

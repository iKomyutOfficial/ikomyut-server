import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ enum: ['rider', 'driver', 'admin'], default: 'rider' })
  @IsEnum(['rider', 'driver', 'admin'])
  type!: string;

  @ApiProperty()
  @IsString()
  mobnum!: string;

  @ApiProperty()
  @IsString()
  password!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;
}

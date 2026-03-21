import { IsString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PersonalRequirements } from '../../schemas/drivers-personal-req.schema';
import { TransportRequirements } from '../../schemas/drivers-transport-req.schema';

export class CreateDriverDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '9171234567' })
  @IsString()
  mobnum!: string;

  @ApiPropertyOptional({ example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '123 Main St, Quezon City' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    enum: ['rider', 'driver', 'admin'],
    example: 'driver',
  })
  @IsOptional()
  @IsEnum(['rider', 'driver', 'admin'])
  type?: string;

  @ApiPropertyOptional({ type: () => PersonalRequirements })
  @IsOptional()
  personalRequirements?: PersonalRequirements;

  @ApiPropertyOptional({ type: () => TransportRequirements })
  @IsOptional()
  transportRequirements?: TransportRequirements;
}

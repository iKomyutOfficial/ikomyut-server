import {
  IsString,
  IsOptional,
  IsEmail,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { PersonalRequirements } from '../../schemas/drivers-personal-req.schema';
import { TransportRequirements } from '../../schemas/drivers-transport-req.schema';

export class CreateDriverDto {
  @IsString()
  name!: string;

  @IsString()
  mobnum!: string;

  @IsString()
  password!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  fcmToken?: string;

  @IsOptional()
  @IsEnum(['rider', 'driver', 'admin'])
  type?: string;

  @IsOptional()
  personalRequirements?: PersonalRequirements;

  @IsOptional()
  transportRequirements?: TransportRequirements;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FileObjectDto } from './file-object.dto';

export class PersonalRequirementsDto {
  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  profilePicture?: FileObjectDto;

  @ApiPropertyOptional({ example: 'Filipino' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  pwd?: number;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  pwdFile?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  vaccinationCertificate?: FileObjectDto;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  vaccinationCertificateConsent?: boolean;

  @ApiPropertyOptional({ example: 'Maria Dela Cruz' })
  @IsString()
  @IsOptional()
  emergencyContactName?: string;

  @ApiPropertyOptional({ example: 'Quezon City' })
  @IsString()
  @IsOptional()
  emergencyContactAddress?: string;

  @ApiPropertyOptional({ example: '9123456789' })
  @IsString()
  @IsOptional()
  emergencyContactMobNum?: string;

  @ApiPropertyOptional({ example: 'Spouse' })
  @IsString()
  @IsOptional()
  emergencyRelationship?: string;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  driverLicenseFront?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  driverLicenseBack?: FileObjectDto;

  @ApiPropertyOptional({ example: 'D01-23-456789' })
  @IsString()
  @IsOptional()
  driverLicenseNumber?: string;

  @ApiPropertyOptional({ example: '2028-06-30' })
  @IsString()
  @IsOptional()
  driverLicenseExpDate?: string;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  documentType?: string;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  documentImg?: FileObjectDto;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  privacyNotice?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  codeOfConduct?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  termsOfService?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  declarations?: boolean;
}

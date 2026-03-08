import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { FileObjectDto } from './file-object.dto';

export class VehicleOwnershipDto {
  @ApiPropertyOptional({ example: 'OWN-001' })
  @IsOptional()
  @IsString()
  ownershipId?: string;

  @ApiPropertyOptional({ example: 'Owner is the driver' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Juan Dela Cruz' })
  @IsOptional()
  @IsString()
  operatorsFullName?: string;

  @ApiPropertyOptional({ example: 'Quezon City' })
  @IsOptional()
  @IsString()
  operatorsAddress?: string;

  @ApiPropertyOptional({ example: '09171234567' })
  @IsOptional()
  @IsString()
  operatorsMobileNumber?: string;

  // Added FileObject
  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  operatorDocuments?: FileObjectDto;
}

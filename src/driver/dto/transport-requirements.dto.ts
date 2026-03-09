import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { VehicleOwnershipDto } from './vehicle-ownership.dto';
import { FileObjectDto } from './file-object.dto';

export class TransportRequirementsDto {
  @ApiPropertyOptional({ type: VehicleOwnershipDto })
  @ValidateNested()
  @Type(() => VehicleOwnershipDto)
  @IsOptional()
  vehicleOwnership?: VehicleOwnershipDto;

  @ApiPropertyOptional({ example: 'ABC-1234' })
  @IsOptional()
  @IsString()
  plateNumber?: string;

  @ApiPropertyOptional({ example: 'White' })
  @IsOptional()
  @IsString()
  carColor?: string;

  @ApiPropertyOptional({ example: 'Toyota' })
  @IsOptional()
  @IsString()
  carBrand?: string;

  @ApiPropertyOptional({ example: 'Vios' })
  @IsOptional()
  @IsString()
  carModel?: string;

  @ApiPropertyOptional({ example: 'CPC' })
  @IsOptional()
  @IsString()
  ltfrbDocType?: string;

  // ===== FILE OBJECT FIELDS =====

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  ownerDocuments?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  operatorsDocument?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  vehicleOR?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  vehicleCR?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  vehicleSalesInvoice?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  authorizationLetterPageOne?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  authorizationLetterPageTwo?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  sPAPageOne?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  sPAPageTwo?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  pAPageOne?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  pAPageTwo?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  cPCPageOne?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  cPCPageTwo?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  mEPAPageOne?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  mEPAPageTwo?: FileObjectDto;

  @ApiPropertyOptional({ type: FileObjectDto })
  @ValidateNested()
  @Type(() => FileObjectDto)
  @IsOptional()
  pAMI?: FileObjectDto;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateTimeMatrixDto } from './create-time-matrix.dto';

export class UpdateTimeMatrixDto extends PartialType(CreateTimeMatrixDto) {
  @ApiProperty({ example: 'editor_user' })
  @IsString()
  @IsNotEmpty()
  modifiedBy!: string;
}
import { IsString, IsIn, IsOptional } from 'class-validator';

export class UpdateDriverStatusDto {
  @IsString()
  @IsIn(['pending', 'approved', 'rejected', 'inactive'])
  status!: string;

  @IsOptional()
  @IsString()
  updatedBy!: string;
}

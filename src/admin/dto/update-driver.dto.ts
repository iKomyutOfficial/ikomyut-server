import { IsString, IsIn, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDriverStatusDto {
  @ApiProperty({
    example: 'approved',
    description: 'Driver status',
    enum: ['pending', 'approved', 'rejected', 'inactive'],
  })
  @IsString()
  @IsIn(['pending', 'approved', 'rejected', 'inactive'])
  status!: string;
}

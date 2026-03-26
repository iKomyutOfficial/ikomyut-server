import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDiscountDto {
  @ApiProperty()
  riderId!: string;

  @ApiProperty()
  idNumber!: string;

  @ApiProperty()
  name!: string;

  @ApiPropertyOptional({ enum: ['student', 'senior', 'pwd'] })
  idType?: 'student' | 'senior' | 'pwd';

  @ApiPropertyOptional({ description: 'File object for photo' })
  photoUrl?: any;

  @ApiPropertyOptional({
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status?: 'pending' | 'approved' | 'rejected';

  @ApiPropertyOptional()
  reviewedBy?: string;

  @ApiPropertyOptional()
  reason?: string;

  @ApiPropertyOptional()
  expirationDate?: Date;
}

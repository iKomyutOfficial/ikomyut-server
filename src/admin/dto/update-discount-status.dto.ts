import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'Status of the discount',
    enum: ['pending', 'approved', 'rejected'],
  })
  status!: 'pending' | 'approved' | 'rejected';

  @ApiProperty({
    description: 'User who reviewed the discount',
    example: 'admin123',
  })
  reviewedBy!: string;

  @ApiProperty({
    description: 'Reason for rejection',
    example: 'admin123',
  })
  reason!: string;
}

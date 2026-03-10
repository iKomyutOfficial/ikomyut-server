import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePaymentTypeDto {
  @ApiProperty({
    example: 'Cash',
    description: 'Name of the payment type',
  })
  @IsString()
  paymentType!: string;

  @ApiProperty({
    example: 'Cash payment method',
    description: 'Description of the payment type',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: true,
    description: 'Indicates if payment type is active',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

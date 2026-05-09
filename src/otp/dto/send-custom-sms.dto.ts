import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendCustomSmsDto {
  @ApiProperty({
    example: '9123456789',
    description: 'Mobile number (without leading 0)',
  })
  @IsString()
  @IsNotEmpty()
  mobileNumber!: string;

  @ApiProperty({
    example: 'Your booking has been confirmed!',
    description: 'Custom SMS message',
  })
  @IsString()
  @IsNotEmpty()
  message!: string;
}

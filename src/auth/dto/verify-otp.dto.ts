import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: '9123456789',
  })
  @IsString()
  mobileNumber!: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  otp!: string;
}

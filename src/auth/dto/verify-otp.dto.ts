import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: '09123456789',
  })
  @IsString()
  mobnum!: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  otp!: string;
}

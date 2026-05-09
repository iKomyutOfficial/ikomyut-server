import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestOtpDto {
  @ApiProperty({
    example: '9123456789',
    description: 'User mobile number',
  })
  @IsString()
  mobileNumber!: string;
}

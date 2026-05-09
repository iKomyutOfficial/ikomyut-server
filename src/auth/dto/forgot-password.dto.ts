// dto/forgot-password.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    example: 'admin1',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;
}

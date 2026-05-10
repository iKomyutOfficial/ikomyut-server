// dto/reset-password.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: 'admin1',
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  otp!: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description:
      'Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: 'Password must include uppercase, lowercase letters and a number',
  })
  newPassword!: string;
}

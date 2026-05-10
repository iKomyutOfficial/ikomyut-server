import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Matches } from 'class-validator';

export class PasswordDto {
  @ApiProperty({
    example: 'StrongP@ssw0rd123',
    description:
      'Must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'Password too weak. Must include uppercase, lowercase, and number.',
  })
  password!: string;
}

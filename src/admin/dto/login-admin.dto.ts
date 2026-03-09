import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ description: 'Admin username' })
  @IsNotEmpty()
  username!: string;

  @ApiProperty({ description: 'Password for admin login' })
  @IsNotEmpty()
  password!: string;
}

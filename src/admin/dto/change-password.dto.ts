import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    example: 'OldPassword@123',
    description: 'Current password of the admin',
  })
  @IsString()
  oldPassword!: string;

  @ApiProperty({
    example: 'NewStrong@123',
    description:
      'New password (min 8 chars, uppercase, lowercase, number, special character)',
  })
  @IsString()
  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/,
  //   {
  //     message:
  //       'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
  //   },
  // )
  newPassword!: string;
}

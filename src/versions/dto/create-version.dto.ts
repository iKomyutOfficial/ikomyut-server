import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVersionDto {
  @ApiProperty({
    description: 'The latest version of the app',
    example: '1.0.3',
  })
  @IsString()
  @IsNotEmpty()
  latestVersion!: string;

  @ApiProperty({
    description: 'Description or release notes of the version',
    example: 'Bug fixes and performance improvements',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;
}

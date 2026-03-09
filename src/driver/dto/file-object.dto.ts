import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class FileObjectDto {
  @ApiPropertyOptional({ example: 'profile.jpg' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'https://example.com/profile.jpg' })
  @IsString()
  @IsOptional()
  url?: string;
}

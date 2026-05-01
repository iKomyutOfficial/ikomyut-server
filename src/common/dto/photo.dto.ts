import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PhotoDto {
  @ApiProperty({
    description: 'Original file name',
    example: 'student-id.jpg',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: 'Photo URL',
    example: 'https://example.com/student-id.jpg',
  })
  @IsString()
  url!: string;
}

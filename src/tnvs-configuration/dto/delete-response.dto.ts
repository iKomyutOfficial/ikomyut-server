import { ApiProperty } from '@nestjs/swagger';

export class DeleteResponseDto {
  @ApiProperty({
    example: 'TnvsConfiguration deleted successfully',
    description: 'Delete confirmation message',
  })
  message!: string;
}
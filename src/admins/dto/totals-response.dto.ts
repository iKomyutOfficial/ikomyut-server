// dto/totals-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class TotalsResponseDto {
  @ApiProperty({ example: 120 })
  drivers!: number;
}

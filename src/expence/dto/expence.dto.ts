import { ApiProperty } from '@nestjs/swagger';

export class ExpenceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  reason: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  status: string;
}

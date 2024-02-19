import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({ default: 'username' })
  username: string;

  @ApiProperty({ default: 'password' })
  password: string;
}

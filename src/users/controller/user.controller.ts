import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { JWTAuthGuard } from 'src/auth/jwt.strategy';
import { UseAuth } from 'src/auth/auth.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @Post('/create')
  // @UseAuth(new JWTAuthGuard())
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }
}

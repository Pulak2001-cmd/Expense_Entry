import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiOperation({ summary: 'Create User' })
  @Post('/create-user')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
  
}

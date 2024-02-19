import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy, AuthGuard } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/users/service/user.service';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOneUserBy({
      where: {
        username,
      },
    });

    if (!user) throw new UnauthorizedException('Username or password is wrong');
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      throw new UnauthorizedException('Username or password is wrong');
    }
    return user;
  }
}

export class LocalAuthGuard extends AuthGuard('local') {}

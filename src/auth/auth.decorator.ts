/* eslint-disable prettier/prettier */
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { JWTAuthGuard } from './jwt.strategy';
import { LocalAuthGuard } from './local.strategy';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserEnum } from 'src/users/enums/user-type.enum';
import { RolesGuard } from './roles.guard';
type TAuthGuard = JWTAuthGuard | LocalAuthGuard;

export function UseAuth(AuthGuard: TAuthGuard, ...roles: UserEnum[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

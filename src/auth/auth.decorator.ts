import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { JWTAuthGuard } from './jwt.strategy';
// import { LocalAuthGuard } from './local.strategy';
// import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
// import { UserRoleEnum } from 'src/user/enums/user-roles.enum';

type TAuthGuard = JWTAuthGuard
//  | LocalAuthGuard
;

export function UseAuth(AuthGuard: TAuthGuard,
     ...roles: UserRoleEnum[]
     ) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard,
        //  RolesGuard
         ),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

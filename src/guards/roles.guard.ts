/* eslint-disable prettier/prettier */
// import { CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
// import { JWTAuthGuard } from "./jwt.strategy";
// import { LocalAstrologerAuthGuard, LocalAuthGuard } from "./local.strategy";

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenClaim } from 'src/auth/dto/jwt-auth-claim.dto';
// import { JWTAuthGuard } from "src/auth/jwt.strategy";
// import { LocalAuthGuard } from "src/auth/local.strategy";
// import { UserRoleEnum } from "src/user/enums/user-roles.enum";

// import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
// import { Reflector } from "@nestjs/core";
// import { JWTAuthClaim } from "./dto/jwt-user-auth-claim.dto";

// type TAuthGuard = JWTAuthGuard | LocalAuthGuard

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const claim: AccessTokenClaim = request.user;

    return claim ? true : false;
  }
}

// approver roleGuard
// export const ApproverGuard = applyDecorators(
//   SetMetadata('userRole', ['Approver']),
//   UseGuards(RolesGuard),
// );

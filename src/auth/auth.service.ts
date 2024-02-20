/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/users/entity/user.entity';
// import * as firebaseAdmin from 'firebase-admin'
// import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { LoginRequest } from './dto/user-login-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessTokenClaim, RefreshTokenClaim } from './dto/jwt-auth-claim.dto';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
// import { CreateUserRequestDto } from 'src/user/dto/create-user-request.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }


    async login(dto: LoginRequest) {

        try {
            const user = await this.usersRepository.findOne({ where: { username: dto.username } });
            if (!user) throw new UnauthorizedException("Please signup first")

            const check = await user.checkPassword(dto.password);
            if(!check) {
                throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST)
            }

            // user.roles = user.userRoleMappings.map(v => v.role.roleName)

            const accessToken = await this.generateAccessToken(user);
            const refreshToken = await this.generateRefreshToken(user);
            delete user.password;
            return { accessToken, refreshToken, user };

        }
        catch (err) {
            console.error(err);
            throw new HttpException(`Cant login user due to ${err}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }





    // generating token()
    async generateAccessToken(user: UserEntity): Promise<string> {
        const claim: AccessTokenClaim = {
            uid: user.id,
            // roles: user.roles,
        }
        const accessToken = this.jwtService.sign(claim, { secret: this.configService.get('jwt.access_token_secret') });

        return accessToken;
    }

    // generating token()
    async generateRefreshToken(user: UserEntity): Promise<string> {
        const claim: RefreshTokenClaim = {
            uid: user.id,
        }
        const refreshToken = this.jwtService.sign(claim, { secret: this.configService.get('jwt.refresh_token_secret') }); 

        return refreshToken;
    }


}

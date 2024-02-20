import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthClaim } from './jwt.strategy';
import { JWTAuthClaim } from './dto/jwt-auth-claim.dto';
import { LoginRequest } from './dto/user-login-request.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiBody({ type: LoginRequest })
    @ApiOperation({ summary: "Login user" })
    loginUser(@Body() body: LoginRequest) {
        return this.authService.login(body);
    }

}

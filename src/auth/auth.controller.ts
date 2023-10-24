import { Body, Controller, HttpCode, HttpStatus, Post, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Observable } from 'rxjs';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenGuard } from './guards/refresh-token-auth.guard';
import { GetCurrentClientId } from '@app/decorators/get-current-client-id.decorator';
import { JwtAuthGuard } from './guards/access-token-auth.guard';
import { GetCurrentUser } from '@app/decorators/get-current-user.decorator';
import { VerifyDto } from './dto/verify-profile.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: RegisterUserDto): Promise<Observable<{ message: string }>> {
        return await this.authService.registerUser(body);
    }

    @HttpCode(HttpStatus.OK)
    @Post('update-password')
    updatePassword(@Body() body: UpdatePasswordDto) {
        return this.authService.updatePassword(body);
    }

    @HttpCode(HttpStatus.OK)
    @Post('reset-password')
    async resetPassword(@Body() body: ResetPasswordDto): Promise<Observable<{ message: string }>> {
        return await this.authService.resetPassword(body);
    }

    @Post('verify-user')
    async verifyUser(@Body() body: VerifyDto): Promise<Observable<{ message: string }>> {
        return await this.authService.verifyUser(body);
    }

    @Post('login')
    async login(@Body() body: LoginUserDto): Promise<Observable<{ message: string }>> {
        return await this.authService.login(body);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@GetCurrentClientId() clientId: string): Promise<void> {
        return await this.authService.logout(clientId);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refreshToken(@GetCurrentClientId() clientId: string, @GetCurrentUser('refreshToken') refreshToken: string): Promise<void> {
        return await this.authService.refreshToken(clientId, refreshToken);
    }
}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Observable } from 'rxjs';
import { VerifyDto } from './dto/verify-profile.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: RegisterUserDto): Promise<Observable<{ message: string }>> {
        return await this.authService.registerUser(body);
    }

    @Post('verify-user')
    async login(@Body() body: VerifyDto): Promise<Observable<{ message: string }>> {
        return await this.authService.verifyUser(body);
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
}

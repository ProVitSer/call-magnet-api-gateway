import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshTokenGuard } from './guards/refresh-token-auth.guard';
import { GetCurrentClientId } from '@app/common/decorators/get-current-client-id.decorator';
import { JwtAuthGuard } from './guards/access-token-auth.guard';
import { GetCurrentUser } from '@app/common/decorators/get-current-user.decorator';
import { VerifyDto } from './dto/verify.dto';
import { HttpResponseService } from '@app/http/http.service';
import {
    BaseResponse,
    LogoutResponse,
    RefreshTokenResponse,
    RegisterUserResponse,
    LoginResponse,
    VerificationCodeResponse,
    ForgotPasswordResponse,
} from '@app/platform-types/auth/interfaces';
import { Request, Response } from 'express';
import { VerifyUserResponse } from '@app/platform-types/auth/types';
import { VerificationCodeDto } from './dto/verification-code.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Req() req: Request, @Res() res: Response, @Body() body: RegisterUserDto) {
        const response = await this.authService.registerUser(body);
        return HttpResponseService.response<RegisterUserResponse>(req, res, HttpStatus.CREATED, response);
    }

    @Post('reset-password')
    async resetPassword(@Req() req: Request, @Res() res: Response, @Body() body: ResetPasswordDto) {
        const response = await this.authService.resetPassword(body);
        return HttpResponseService.response<BaseResponse>(req, res, HttpStatus.OK, response);
    }

    @HttpCode(HttpStatus.OK)
    @Post('forgot-password')
    async forgotPassword(@Req() req: Request, @Res() res: Response, @Body() body: ForgotPasswordDto) {
        const response = await this.authService.forgotPassword(body);
        return HttpResponseService.response<ForgotPasswordResponse>(req, res, HttpStatus.OK, response);
    }

    @Post('verify-user')
    async verifyUser(@Req() req: Request, @Res() res: Response, @Body() body: VerifyDto) {
        const response = await this.authService.verifyUser(body);
        return HttpResponseService.response<VerifyUserResponse>(req, res, HttpStatus.OK, response);
    }

    @Post('check-verification-code')
    async checkVerificationCode(@Req() req: Request, @Res() res: Response, @Body() body: VerificationCodeDto) {
        const response = await this.authService.checkVerificationCode(body);
        return HttpResponseService.response<VerificationCodeResponse>(req, res, HttpStatus.OK, response);
    }

    @Post('login')
    async login(@Req() req: Request, @Res() res: Response, @Body() body: LoginUserDto) {
        const response = await this.authService.login(body);
        return HttpResponseService.response<LoginResponse>(req, res, HttpStatus.OK, response);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Req() req: Request, @Res() res: Response, @GetCurrentClientId() clientId: string) {
        const response = await this.authService.logout(clientId);
        return HttpResponseService.response<LogoutResponse>(req, res, HttpStatus.OK, response);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refreshToken(
        @Req() req: Request,
        @Res() res: Response,
        @GetCurrentClientId() clientId: string,
        @GetCurrentUser('refreshToken') refreshToken: string,
    ) {
        const response = await this.authService.refreshToken(clientId, refreshToken);
        return HttpResponseService.response<RefreshTokenResponse>(req, res, HttpStatus.OK, response);
    }
}

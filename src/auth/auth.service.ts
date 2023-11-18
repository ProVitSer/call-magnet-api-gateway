import { Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { VerifyDto } from './dto/verify-profile.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
    BaseResponse,
    LogoutResponse,
    RegisterUserResponse,
    ResetPasswordResponse,
    RefreshTokenResponse,
    LoginResponse,
} from '@app/platform-types/auth/interfaces';
import { VerifyUserResponse } from '@app/platform-types/auth/types';
import { MessagePatternCmd } from '@app/platform-types/client-proxy/types';

export class AuthService {
    constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}

    public async registerUser(data: RegisterUserDto): Promise<RegisterUserResponse> {
        return await firstValueFrom<RegisterUserResponse>(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.register }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async verifyUser(data: VerifyDto): Promise<VerifyUserResponse> {
        return await firstValueFrom<VerifyUserResponse>(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.verifyUser }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async resetPassword(data: ResetPasswordDto): Promise<ResetPasswordResponse> {
        return await firstValueFrom<ResetPasswordResponse>(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.resetPassword }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async updatePassword(data: UpdatePasswordDto): Promise<BaseResponse> {
        return await firstValueFrom<BaseResponse>(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.updatePassword }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async login(data: LoginUserDto): Promise<LoginResponse> {
        return await firstValueFrom<LoginResponse>(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.login }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async logout(clientId: string): Promise<LogoutResponse> {
        return await firstValueFrom<LogoutResponse>(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.logout }, clientId)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async refreshToken(clientId: string, refreshToken: string): Promise<RefreshTokenResponse> {
        return await firstValueFrom<RefreshTokenResponse>(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.refreshToken }, { clientId, refreshToken })
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async findUserByClientId(clientId: string) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.findUserByClientId }, clientId)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }
}

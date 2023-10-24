import { Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { VerifyDto } from './dto/verify-profile.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { LoginUserDto } from './dto/login-user.dto';

export class AuthService {
    constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}

    public async registerUser(data: RegisterUserDto): Promise<Observable<{ message: string }>> {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'register' }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async verifyUser(data: VerifyDto): Promise<Observable<{ message: string }>> {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'verify-user' }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async resetPassword(data: ResetPasswordDto) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'reset-password' }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async updatePassword(data: UpdatePasswordDto) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'update-password' }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async login(data: LoginUserDto) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'login' }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async logout(clientId: string) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'logout' }, clientId)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async refreshToken(clientId: string, refreshToken: string) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'refresh-token' }, { clientId, refreshToken })
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async findUserByClientId(clientId: string) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'find-user-by-clientId' }, clientId)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }
}

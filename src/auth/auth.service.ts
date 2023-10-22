import { Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { RegisterUserDto } from './dto/register-user.dto';
import { VerifyDto } from './dto/verify-profile.dto';

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

    public async validateToken(token: string) {
        return await firstValueFrom(this.userServiceClient.send({ cmd: 'validate-token' }, token));
    }
}

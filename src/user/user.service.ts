import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
    constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}

    public async registerUser(data: RegisterUserDto): Promise<Observable<{ message: string }>> {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: 'register' }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }
}

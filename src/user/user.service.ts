import { MessagePatternCmd } from '@app/platform-types/client-proxy/types';
import { UpdateClientInfoData } from '@app/platform-types/user/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class UserService {
    constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}

    public async findUserByClientId(clientId: string) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.findUserByClientId }, clientId)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async getClientInfo(clientId: string) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.getClientInfo }, clientId)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async updateClientInfo(data: UpdateClientInfoData) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.updateClientInfo }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }
}

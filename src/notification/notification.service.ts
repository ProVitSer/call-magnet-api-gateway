import { MessagePatternCmd } from '@app/platform-types/client-proxy/types';
import { GetClientNotificationsData, MarkNotificationsIsReadData } from '@app/platform-types/notification/interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable()
export class NotificationService {
    constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}

    public async getClientNotification(data: GetClientNotificationsData) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.getClientNotifications }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }

    public async markNotificationsIsRead(data: MarkNotificationsIsReadData) {
        return await firstValueFrom(
            this.userServiceClient
                .send({ cmd: MessagePatternCmd.markNotificationsIsRead }, data)
                .pipe(catchError((error) => throwError(() => new RpcException(error.response)))),
        );
    }
}

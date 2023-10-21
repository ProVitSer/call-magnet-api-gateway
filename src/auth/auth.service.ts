import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class AuthService {
    constructor(@Inject('USER_SERVICE') private userServiceClient: ClientProxy) {}

    public async validateToken(token: string) {
        return await firstValueFrom(this.userServiceClient.send({ cmd: 'validate-token' }, token));
    }
}

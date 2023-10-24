import { UserModule } from '@app/user/user.module';
import { Global, Module, Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

const clientProxyProvider: Provider = {
    provide: 'USER_SERVICE',
    useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: process.env.USER_SERVICE_QUEUE,
                queueOptions: { durable: false },
            },
        });
    },
};

@Global()
@Module({
    imports: [UserModule],
    providers: [AuthService, clientProxyProvider, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}

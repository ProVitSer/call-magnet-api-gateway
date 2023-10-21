import { Module } from '@nestjs/common/decorators';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Provider } from '@nestjs/common';

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

@Module({
    imports: [],
    controllers: [UserController],
    providers: [clientProxyProvider, UserService],
    exports: [clientProxyProvider],
})
export class UserModule {}

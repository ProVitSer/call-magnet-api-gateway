import { Module } from '@nestjs/common/decorators';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Provider } from '@nestjs/common';
import { ClientProxyProvide } from '@app/platform-types/client-proxy/types';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

const clientProxyProvider: Provider = {
    provide: ClientProxyProvide.user,
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
    controllers: [NotificationController],
    providers: [clientProxyProvider, NotificationService],
    exports: [clientProxyProvider],
})
export class NotificationModule {}

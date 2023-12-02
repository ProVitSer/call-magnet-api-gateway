import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/config/config.provider';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: configuration(),
        }),
        AuthModule,
        UserModule,
        NotificationModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}

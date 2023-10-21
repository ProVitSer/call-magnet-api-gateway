import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/config/config.provider';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: configuration(),
        }),
        AuthModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}

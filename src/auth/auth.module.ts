import { UserModule } from '@app/user/user.module';
import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Global()
@Module({
    imports: [UserModule],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}

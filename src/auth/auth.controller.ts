import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Observable } from 'rxjs';
import { VerifyDto } from './dto/verify-profile.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: RegisterUserDto): Promise<Observable<{ message: string }>> {
        return await this.authService.registerUser(body);
    }

    @Post('verify-user')
    async login(@Body() body: VerifyDto): Promise<Observable<{ message: string }>> {
        return await this.authService.verifyUser(body);
    }

    // @Post('login')
    // // @UseGuards(AuthGuard)
    // async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Observable<any>> {
    //     console.log(loginUserDto);
    // }

    // @Post('logout')
    // async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<any> {
    //     console.log(loginUserDto);
    // }

    // @Get('refresh')
    // async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<any> {
    //     console.log(loginUserDto);
    // }

    // @Post('update-password')
    // updatePassword(@Payload() updatePassword: updatePasswordDto) {}

    // @Post('reset-password')
    // resetPassword(@Payload() reserPassword: resetPasswordDto) {}

    // @Get('verify')
    // async verifyEmail(@Query() query: EmailVerificationDto, @Res() res: Response): Promise<Response> {}

    // @Get('profile')
    // async getProfile(@User() reqUser: user, @Res() res: Response): Promise<object> {}
}

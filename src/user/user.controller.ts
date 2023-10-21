import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body() body: RegisterUserDto): Promise<Observable<{ message: string }>> {
        return await this.userService.registerUser(body);
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

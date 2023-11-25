import { Controller, Get, HttpStatus, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@app/auth/guards/access-token-auth.guard';
import { GetCurrentClientId } from '@app/common/decorators/get-current-client-id.decorator';
import { HttpResponseService } from '@app/http/http.service';
import { Request, Response } from 'express';
import { GetClientInfoResponse } from '@app/platform-types/user/interfaces';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('client-info')
    async getClientInfo(@Req() req: Request, @Res() res: Response, @GetCurrentClientId() clientId: string) {
        const response = await this.userService.getClientInfo(clientId);
        return HttpResponseService.response<GetClientInfoResponse>(req, res, HttpStatus.OK, response);
    }
}

import { Body, Controller, Get, HttpStatus, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '@app/auth/guards/access-token-auth.guard';
import { GetCurrentClientId } from '@app/common/decorators/get-current-client-id.decorator';
import { HttpResponseService } from '@app/http/http.service';
import { Request, Response } from 'express';
import { ChangePasswordResponse, GetClientInfoResponse, UpdateClientInfoResponse } from '@app/platform-types/user/interfaces';
import { UpdateClientInfoDto } from './dto/update-client-info.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('client-info')
    async getClientInfo(@Req() req: Request, @Res() res: Response, @GetCurrentClientId() clientId: string) {
        const response = await this.userService.getClientInfo(clientId);
        return HttpResponseService.response<GetClientInfoResponse>(req, res, HttpStatus.OK, response);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-client-info')
    async updateClientInfo(
        @Req() req: Request,
        @Res() res: Response,
        @GetCurrentClientId() clientId: string,
        @Body() body: UpdateClientInfoDto,
    ) {
        const response = await this.userService.updateClientInfo({ clientId, ...body });
        return HttpResponseService.response<UpdateClientInfoResponse>(req, res, HttpStatus.OK, response);
    }

    @UseGuards(JwtAuthGuard)
    @Put('change-password')
    async changePassword(
        @Req() req: Request,
        @Res() res: Response,
        @GetCurrentClientId() clientId: string,
        @Body() body: ChangePasswordDto,
    ) {
        const response = await this.userService.changePassword({ clientId, ...body });
        return HttpResponseService.response<ChangePasswordResponse>(req, res, HttpStatus.OK, response);
    }
}

import { Body, Controller, Get, HttpStatus, Put, Query, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/guards/access-token-auth.guard';
import { GetCurrentClientId } from '@app/common/decorators/get-current-client-id.decorator';
import { HttpResponseService } from '@app/http/http.service';
import { Request, Response } from 'express';
import { NotificationService } from './notification.service';
import { GetClientNotificationsReponse } from '@app/platform-types/notification/interfaces';
import { NotificationsIsReadDto } from './dto/notifications-is-read.dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getClientInfo(@Req() req: Request, @Res() res: Response, @Query('limit') limit: string, @GetCurrentClientId() clientId: string) {
        const response = await this.notificationService.getClientNotification({ clientId, limit });
        return HttpResponseService.response<GetClientNotificationsReponse[]>(req, res, HttpStatus.OK, response);
    }

    @UseGuards(JwtAuthGuard)
    @Put('mark-read')
    async markNotificationsIsRead(
        @Req() req: Request,
        @Res() res: Response,
        @Body() body: NotificationsIsReadDto,
        @GetCurrentClientId() clientId: string,
    ) {
        const response = await this.notificationService.markNotificationsIsRead({ clientId, ...body });
        return HttpResponseService.response<object>(req, res, HttpStatus.OK, response);
    }
}

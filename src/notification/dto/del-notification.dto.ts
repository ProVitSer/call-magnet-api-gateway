import { IsNotEmpty, IsString } from 'class-validator';

export class DelNotificationDto {
    @IsString()
    @IsNotEmpty()
    notificationId: string;
}

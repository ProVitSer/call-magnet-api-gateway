import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class NotificationListDto {
    @IsNumber()
    @IsOptional()
    offset?: number;

    @IsNumber()
    @IsNotEmpty()
    limit: number;
}

import { IsArray, IsNotEmpty } from 'class-validator';

export class NotificationsIsReadDto {
    @IsArray()
    @IsNotEmpty()
    ids: string[];
}

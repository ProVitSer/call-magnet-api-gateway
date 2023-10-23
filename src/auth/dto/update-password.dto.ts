import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsString()
    token: string;

    @IsString()
    @MinLength(8)
    password: string;
}

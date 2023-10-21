import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UtilsService } from '@app/utils/utils.service';

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty({ message: 'Please provide valid email' })
    @IsString({ message: 'email should be string' })
    email: string;

    @Transform(({ value }) => UtilsService.trim(value))
    @IsNotEmpty({ message: 'Password is required.' })
    @IsOptional()
    password?: string;
}

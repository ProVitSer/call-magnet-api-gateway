import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { UtilsService } from '@app/common/utils/utils.service';
import { EMAIL_IS_NOT_EMPTY, EMAIL_SHOULD_STRING, PASSWORD_REQUIRED } from '@app/common/constant/dto.constants';

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty({ message: EMAIL_IS_NOT_EMPTY })
    @IsString({ message: EMAIL_SHOULD_STRING })
    email: string;

    @Transform(({ value }) => UtilsService.trim(value))
    @IsNotEmpty({ message: PASSWORD_REQUIRED })
    password: string;
}

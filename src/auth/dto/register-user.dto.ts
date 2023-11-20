import {
    EMAIL_IS_NOT_EMPTY,
    FIRST_IS_NOT_EMPTY,
    FIRST_SHOULD_STRING,
    LASTNAME_IS_NOT_EMPTY,
    LASTNAME_SHOULD_STRING,
    MIN_LENGTH_PASSWORD,
    PASSWORD_SHOULD_STRING,
    PHONE_IS_NOT_EMPTY,
    COMPANY_IS_NOT_EMPTY,
} from '@app/common/constant/dto.constants';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsString({ message: FIRST_SHOULD_STRING })
    @IsNotEmpty({ message: FIRST_IS_NOT_EMPTY })
    @MinLength(2)
    firstname: string;

    @IsString({ message: LASTNAME_SHOULD_STRING })
    @IsNotEmpty({ message: LASTNAME_IS_NOT_EMPTY })
    @MinLength(2)
    lastname: string;

    @IsEmail()
    @IsNotEmpty({ message: EMAIL_IS_NOT_EMPTY })
    email: string;

    @IsString()
    @IsNotEmpty({ message: PHONE_IS_NOT_EMPTY })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty({ message: COMPANY_IS_NOT_EMPTY })
    company: string;

    @IsNotEmpty({ message: PASSWORD_SHOULD_STRING })
    @MinLength(8, { message: MIN_LENGTH_PASSWORD })
    password: string;
}

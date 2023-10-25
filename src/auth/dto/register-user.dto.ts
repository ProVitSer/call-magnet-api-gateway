import {
    EMAIL_IS_NOT_EMPTY,
    FIRST_IS_NOT_EMPTY,
    FIRST_SHOULD_STRING,
    LASTNAME_IS_NOT_EMPTY,
    LASTNAME_SHOULD_STRING,
    MIN_LENGTH_PASSWORD,
    PASSWORD_SHOULD_STRING,
    PHONE_SHOULD_STRING,
} from '@app/common/constant/dto.constants';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

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

    @IsPhoneNumber()
    @IsNotEmpty({ message: PHONE_SHOULD_STRING })
    phoneNumber: number;

    @IsNotEmpty({ message: PASSWORD_SHOULD_STRING })
    @MinLength(8, { message: MIN_LENGTH_PASSWORD })
    password: string;
}

import { MIN_LENGTH_PASSWORD } from '@app/common/constant/dto.constants';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    verificationCode: string;

    @IsString()
    @MinLength(8, { message: MIN_LENGTH_PASSWORD })
    password: string;
}

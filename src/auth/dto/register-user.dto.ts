import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
    @IsString({ message: 'firstname should be string' })
    @IsNotEmpty({ message: 'firstname is required.' })
    @MinLength(2)
    firstname: string;

    @IsString({ message: 'lastname should be string' })
    @IsNotEmpty({ message: 'lastname is required.' })
    @MinLength(2)
    lastname: string;

    @IsEmail()
    @IsNotEmpty({ message: 'email is required.' })
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty({ message: 'phoneNumber is required.' })
    phoneNumber: number;

    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(8)
    password: string;
}

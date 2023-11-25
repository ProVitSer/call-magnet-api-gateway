import { IsOptional, IsString } from 'class-validator';

export class UpdateClientInfoDto {
    @IsString()
    @IsOptional()
    firstname?: string;

    @IsString()
    @IsOptional()
    lastname?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    company?: string;
}

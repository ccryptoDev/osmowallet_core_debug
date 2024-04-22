import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendForgotPasswordDto {
    @IsEmail()
    email!: string

    @IsNotEmpty()
    clientId!: string

    @IsNotEmpty()
    clientSecret!: string
}   
import { Transform } from "class-transformer"
import { IsNumber } from "class-validator"
import { SignInDto } from "./signin.dto"

export class AuthOTPDto extends SignInDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    otp!: number
}
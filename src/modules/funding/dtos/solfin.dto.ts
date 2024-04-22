import { IsEmail, IsIBAN, IsString } from "class-validator"

export class SolfinFundingDto {
    @IsIBAN()
    ibanFrom!: string

    @IsString()
    nameFrom!: string

    @IsEmail()
    emailFrom!: string

    @IsString()
    documentFrom!: string

    @IsString()
    documentTypeFrom!: number

    @IsString()
    description: string = ''
}
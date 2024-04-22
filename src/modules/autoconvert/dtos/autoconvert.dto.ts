import { IsBoolean, IsOptional, IsPositive, IsUUID } from "class-validator"

export class AutoConvertDto {
    @IsUUID()
    coinId!: string

    @IsPositive()
    percent!: number

    @IsBoolean()
    @IsOptional()
    isActive!: boolean
}
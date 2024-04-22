import { IsNumber, IsPositive, IsUUID } from "class-validator";

export class CashpakWithdrawDto {
    @IsPositive()
    @IsNumber()
    amount!: number

    @IsUUID()
    coinId!: string
}
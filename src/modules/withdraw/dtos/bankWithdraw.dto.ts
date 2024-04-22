import { IsUUID } from "class-validator";

export class BankWithdrawDto {
    @IsUUID()
    bankAccountId!: string
}
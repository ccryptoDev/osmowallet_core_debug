import { IsEnum,IsNotEmpty,IsNumberString, IsString, IsUUID } from 'class-validator';
import { BankAccountType } from 'src/common/enums/bankAccountType.enum';

export class BankAccountDto{
    @IsNumberString()
    accountNumber!: string

    @IsUUID()
    bankId!: string

    @IsString()
    accountName!: string
    
    @IsUUID()
    coinId!: string

    @IsEnum(BankAccountType)
    accountType!: BankAccountType
}

export class UpdateBankAccountDTO {
    @IsString()
    @IsNotEmpty()
    id!: string
}

export class DeleteBankAccountDTO {
    @IsString()
    @IsNotEmpty()
    id!: string
}

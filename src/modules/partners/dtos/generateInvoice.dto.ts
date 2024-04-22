import { Type } from "class-transformer"
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator"
import { PartnerFlow } from "../enums/partnerFlow.enum"
import { BankDataDto } from "./bankData.dto"



export class PartnerGenerateInvoiceDto {

    @IsString()
    @IsNotEmpty()
    referenceId!: string

    @IsString()
    @IsNotEmpty()
    phoneNumber!: string

    @IsNumber()
    @IsNotEmpty()
    amount!: number

    @IsString()
    @IsNotEmpty()
    description!: string
    
    @Type(() => BankDataDto)
    @IsOptional()
    @ValidateNested()
    bankAddress!: BankDataDto

    @IsEnum(PartnerFlow)
    flowType!: PartnerFlow

}


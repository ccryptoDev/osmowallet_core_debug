import { IsNotEmptyObject, IsString } from "class-validator";
import { IbexLightningPaymentTransaction } from "../../ibex/entities/ibexLightningTransaction";

export class PayingInvoiceDto {

    @IsString()
    webhookSecret!: string

    @IsNotEmptyObject()
    transaction!: IbexLightningPaymentTransaction
}
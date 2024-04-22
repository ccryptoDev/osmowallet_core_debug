import { IsMongoId } from "class-validator";
import { StrikeInvoiceDto } from "./invoice.dto";

export class StrikeBankInvoiceDto extends StrikeInvoiceDto {
    @IsMongoId()
    paymentMethodId!: string
}
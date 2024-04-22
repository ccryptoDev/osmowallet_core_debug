import { IsOptional, IsUUID } from "class-validator"

export class GetFundingByTierDto {
    @IsUUID()
    @IsOptional()
    tierId!: string
}
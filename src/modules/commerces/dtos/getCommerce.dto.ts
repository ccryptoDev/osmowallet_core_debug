import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";
import { toNumber } from "src/common/transformers/number.transformer";

export class GetCommerceDto {
    @IsOptional()
    query!: string

    @Min(1)
    @IsInt()
    @Transform(({ value }) => toNumber(value, { default: 0, min: 1, max: 100 }))
    @IsOptional()
    page = 1
}
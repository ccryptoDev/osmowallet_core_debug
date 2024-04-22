import { Transform } from "class-transformer"
import { IsLatitude, IsLongitude, IsNumber, Min } from "class-validator"

export class NearestCommerceDto {
    @Min(10)
    @IsNumber()
    @Transform(({ value }) => Number.parseFloat(value))
    radius!: number

    @IsLatitude()
    @Transform(({ value }) => Number.parseFloat(value))
    lat!: number
    
    @IsLongitude()
    @Transform(({ value }) => Number.parseFloat(value))
    lon!: number
}
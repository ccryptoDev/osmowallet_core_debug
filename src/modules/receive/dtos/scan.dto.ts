import { IsNotEmpty, IsString } from "class-validator";

export class ScanDto {
    @IsString()
    @IsNotEmpty()
    address!: string

    @IsNotEmpty()
    rocket: any

    btcPrice?: number
}
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { GrantType } from "../enums/granTypes.enum";
import { AuthDto } from "./auth.dto";

export class SignInDto extends AuthDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.grantType == GrantType.Password)
  @IsOptional()
  input!: string;
}
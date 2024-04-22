import { IsValidConfirmPassword, IsValidPassword } from 'src/common/dto_validators/password.validator';

export class ResetPasswordDto {
  @IsValidPassword({ message: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número' })
  newPassword!: string

  @IsValidConfirmPassword('newPassword', { message: 'Las contraseñas no coinciden' })
  confirmNewPassword!: string
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/common/decorators/user.decorator';
import { AccessTokenGuard } from 'src/modules/auth/guards/accessToken.guard';
import { AuthUser } from '../auth/payloads/auth.payload';
import { UsersService } from '../users/users.service';
import { BankAccountDto, DeleteBankAccountDTO, UpdateBankAccountDTO } from './dto/banks.account.dto';
import { EditEmailDto } from './dto/editEmail.dto';
import { EditMobileDto } from './dto/editMobile.dto';
import { PreferenceDto } from './dto/preference.dto';
import { ProfilePictureDto } from './dto/profilePicture.dto';
import { UpdateResidenceDto } from './dto/residence-update.dto';
import { UpdateUsernameDto } from './dto/updateUsername.dto';
import { MeService } from './me.service';

@UseGuards(AccessTokenGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('me')
export class MeController {
  constructor(
    private meService: MeService,
    private userService: UsersService
  ) { }

  @Get('/residence')
  getResidenceChanged(@User() user: AuthUser) {
    return this.userService.getResidenceChange(user)
  }

  @Patch('/residence')
  updateResidence(@User() user: AuthUser, @Body() data: UpdateResidenceDto) {
    return this.userService.updateResidence(user.sub, data)
  }

  @Patch('/mobile')
  updatePhone(@User() user: AuthUser, @Body() data: EditMobileDto) {
    return this.meService.updatePhone(user, data)
  }

  @Delete('/')
  deleteAccount(@User() user: AuthUser) {
    return this.meService.deleteOsmoAccount(user)
  }

  @Patch('/email')
  updateEmail(@User() user: AuthUser, @Body() data: EditEmailDto) {
    return this.meService.updateEmail(user, data);
  }

  @Patch('/username')
  updateUsername(@User() user: AuthUser, @Body() data: UpdateUsernameDto) {
    return this.meService.updateUsername(user, data);
  }

  @Get()
  async getProfile(@User() user: AuthUser) {
    return this.meService.getProfile(user);
  }

  @Patch('profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  updateProfilePicture(
    @User() user: AuthUser,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: ProfilePictureDto,
  ) {
    return this.meService.updateProfilePicture(user, file, data);
  }

  @Post('bank-accounts')
  createBankAccount(@User() user: AuthUser, @Body() data: BankAccountDto) {

    return this.meService.createBankAccount(user, data);
  }
  @Get('bank-accounts')
  getBankAccounts(@User() user: AuthUser) {

    return this.meService.getBankAccounts(user);
  }

  @Put('bank-accounts/:id')
  updatebankAccount(@User() user: AuthUser,
    @Body() data: BankAccountDto,
    @Param() bankAccountDto: UpdateBankAccountDTO,
  ) {
    return this.meService.updateBankAccount(user, data, bankAccountDto.id);
  }

  @Delete('bank-accounts/:id')
  deleteBankAccount(@User() user: AuthUser, @Param() bankAccountDto: DeleteBankAccountDTO) {
    return this.meService.deleteBankAccount(user, bankAccountDto.id);
  }

  @Get('wallets')
  getWallets(@User() user: AuthUser) {

    return this.meService.getWallets(user);
  }
  @Get('preferences')
  getPreferences(@User() user: AuthUser) {

    return this.meService.getPreferences(user);
  }

  @Put('preferences')
  updatePreferences(@User() user: AuthUser, @Body() data: PreferenceDto) {
    return this.meService.updatePreference(user, data);
  }

  @Get('recent-contacts')
  getRecentContacts(@User() user: AuthUser) {

    return this.meService.getRecentContacts(user);
  }
}